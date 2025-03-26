import csv
import os
import pandas as pd
from django.core.management import call_command
from django.db import transaction
from tqdm import tqdm

from django.core.management.base import BaseCommand
from g_score.models import ForeignLanguage, Score, Student, Subject
from backend import settings

MODE_REFRESH = 'refresh'
MODE_CLEAR = 'clear'
SUBJECTS = ['toan', 'ngu_van', 'vat_li', 'ngoai_ngu', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd']

FILE_PATH = os.path.join(settings.BASE_DIR, 'data', 'diem_thi_thpt_2024.csv')
BATCH_SIZE = 10000  # Adjust as needed for performance


class Command(BaseCommand):
    help = "Seed database with data from CSV file"

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")
        self.__run_seed(options['mode'])
        self.stdout.write("Seeding completed!")

    def __run_seed(self, mode):
        self.__clear()
        if mode == MODE_CLEAR:
            return

        self.__create_subjects()
        self.__import_csv()

    def __create_subjects(self):
        self.stdout.write("Creating subjects...")
        Subject.objects.bulk_create([Subject(subject=subj) for subj in SUBJECTS], ignore_conflicts=True)
        self.stdout.write("Subjects created!")

    def __clear(self):
        call_command("flush", interactive=False)
        self.stdout.write("Database has been flushed!")

    def __import_csv(self):
        try:
            self.stdout.write("Reading CSV file...")
            df = pd.read_csv(FILE_PATH, encoding='utf-8', chunksize=BATCH_SIZE)  # Process in chunks
            self.stdout.write("Start seeding data...")

            subjects_dict = {subj.subject: subj for subj in Subject.objects.all()}
            existing_students = set(Student.objects.values_list('student_id', flat=True))

            for chunk in df:
                chunk[SUBJECTS] = chunk[SUBJECTS].apply(pd.to_numeric, errors='coerce')
                chunk = chunk.replace({pd.NA: None, float('nan'): None})

                with transaction.atomic():
                    self.__add_students(chunk, existing_students)
                    self.__add_scores_and_languages(chunk, subjects_dict)

            self.stdout.write(self.style.SUCCESS("Successfully seeded records"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File '{FILE_PATH}' not found"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Unexpected error: {e}"))

    def __add_students(self, df, existing_students):
        new_students = [Student(student_id=int(sid)) for sid in df['sbd'].unique() if sid not in existing_students]
        if new_students:
            Student.objects.bulk_create(new_students, ignore_conflicts=True)
            self.stdout.write(f"Inserted {len(new_students)} new students.")

    def __add_scores_and_languages(self, df, subject_dict):
        scores = []
        languages = []

        for _, row in tqdm(df.iterrows(), total=len(df), desc='Processing scores', unit='scores'):
            student, _ = Student.objects.get_or_create(student_id=int(row['sbd']))

            for subject_name in SUBJECTS:
                if row[subject_name] is not None:
                    scores.append(Score(student=student, subject=subject_dict[subject_name], score=row[subject_name]))

            if row['ma_ngoai_ngu']:
                languages.append(ForeignLanguage(language=row['ma_ngoai_ngu'], student=student))

        if scores:
            Score.objects.bulk_create(scores, ignore_conflicts=True)

        if languages:
            ForeignLanguage.objects.bulk_create(languages, ignore_conflicts=True)
