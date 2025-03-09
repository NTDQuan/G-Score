#!/bin/sh
echo "Waiting for MySQL to start..."
while ! nc -z db 3306; do
  sleep 1
done

echo "MySQL started"

python manage.py migrate
python manage.py seed --mode=refresh
exec python manage.py runserver 0.0.0.0:8000