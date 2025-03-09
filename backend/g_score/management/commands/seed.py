import csv
import os
import pandas as pd
from tqdm import tqdm

from django.core.management.base import BaseCommand
from g_score.models import ScoreModel

from backend import settings

""" Clear all data and creates addresses """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'


class Command(BaseCommand):
    help = "Seed database with data from csv file"

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write("Seeding data")
        self.__run_seed(options['mode'])
        self.stdout.write("Seeding done!")

    def __run_seed(self, mode):
        self.__clear()
        if mode == MODE_CLEAR:
            return

        self.__import_csv()

    def __clear(self):
        ScoreModel.objects.all().delete()
        self.stdout.write(self.style.WARNING("Cleared all data"))

    def __import_csv(self):
        FILE_PATH = os.path.join(settings.BASE_DIR, 'data', 'diem_thi_thpt_2024.csv')
        BATCH_SIZE = 10000

        try:
            df = pd.read_csv(FILE_PATH, encoding='utf-8')
            self.stdout.write("Start Seeding data")

            numeric_col = ['toan', 'ngu_van', 'vat_li', 'ngoai_ngu', 'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd']
            df[numeric_col] = df[numeric_col].apply(pd.to_numeric, errors='coerce')

            df = df.replace({pd.NA: None, float('nan'): None})

            records = [
                ScoreModel(
                    id=int(row['sbd']),
                    math=row['toan'],
                    literature=row['ngu_van'],
                    physics=row['vat_li'],
                    foreign_language=row['ngoai_ngu'],
                    chemistry=row['hoa_hoc'],
                    biology=row['sinh_hoc'],
                    history=row['lich_su'],
                    geography=row['dia_li'],
                    civic_education=row['gdcd'],
                    foreign_language_code=row['ma_ngoai_ngu']
                )
                for _, row in tqdm(df.iterrows(), total=len(df), desc="Adding records", unit="record")
            ]

            TOTAL_RECORDS = len(records)

            for i in tqdm(range(0, TOTAL_RECORDS, BATCH_SIZE), desc="Inserting batch", unit="batch"):
                batch = records[i:i + BATCH_SIZE]
                ScoreModel.objects.bulk_create(batch, ignore_conflicts=True)

            self.stdout.write(self.style.SUCCESS(f"Successfully seeded {len(records)} records"))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File '{FILE_PATH}' not found"))
        except Exception as e:
            self.stdout.write(self.style.ERROR('Unexpected error: {}'.format(e)))
