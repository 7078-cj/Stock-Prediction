import os

from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.timezone = "UTC"

app.conf.beat_schedule = {
    "every-5-seconds": {
        "task": "api.tasks.print_hello", 
        "schedule": 5.0,
    },
    "fetch_aapl_after_close": {
        "task": "api.tasks.fetch_stock_data",
        "schedule": crontab(hour=20, minute=10),  # 20:10 UTC
        "args": ("AAPL","60d", "1d"),
    },
}

app.autodiscover_tasks()