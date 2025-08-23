from celery import Celery
from celery import shared_task
import yfinance as yf
import pandas as pd
import os
from django.conf import settings
from .models import Ticker
from .utils import predict_next_day

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
    csv_path = os.path.join(dataset_dir, f"{ticker}_60d_OHLCV.csv")
    data.to_csv(csv_path, index=False)
    
    prediction = predict_next_day(ticker)
    
    model_prediction = Ticker.objects.get(name=ticker)
    model_prediction.predictions.get_or_create(predicted_value=prediction)
    
    print(f"Saved CSV in Colab: {csv_path}")
    print(f"Next day prediction for {ticker}: {prediction}")
    
    
