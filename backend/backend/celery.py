import os

from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.timezone = "UTC"

app.conf.beat_schedule = {
    "every-5-seconds": {
        "task": "api.tasks.print_hello", 
        "schedule": 5.0,
    },
}

app.autodiscover_tasks()