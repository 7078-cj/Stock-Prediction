from celery import Celery
from celery import shared_task

@shared_task(name='api.tasks.print_hello')
def print_hello():
    print("Hello! Task ran.")
