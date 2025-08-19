from celery import Celery
from celery import shared_task
import yfinance as yf
import pandas as pd
import os
from django.conf import settings

@shared_task(name='api.tasks.print_hello')
def print_hello():
    print("Hello! Task ran.")

@shared_task(name='api.tasks.fetch_stock_data')
def fetch_stock_data(ticker, period='60d', interval='1d'):

    data = yf.download(ticker, period=period, interval=interval)

    data.reset_index(inplace=True)
    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')
    BASE_DIR = settings.BASE_DIR
    dataset_dir = os.path.join(BASE_DIR, "current_data")
    if not os.path.exists(dataset_dir):
        os.makedirs(dataset_dir)
        csv_path = os.path.join(dataset_dir, f"{ticker}_60d_OHLCV.csv")


    
    data.to_csv(csv_path, index=False)
    print(f"Saved CSV in Colab: {csv_path}")
