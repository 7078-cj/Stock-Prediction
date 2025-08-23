import os
import tensorflow as tf
from django.apps import AppConfig
from django.conf import settings
from sklearn.preprocessing import StandardScaler
import pandas as pd
import subprocess



class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        
    
            
        aapl_model_path = os.path.join(settings.BASE_DIR, "models", "AAPL_model.h5")
        msft_model_path = os.path.join(settings.BASE_DIR, "models", "MSFT_model.h5")
        self.aapl_model = tf.keras.models.load_model(aapl_model_path, compile=False)
        self.msft_model = tf.keras.models.load_model(msft_model_path, compile=False)

        
        from . import model_holder
        from .utils import fit_scaler
            
        aapl_scaler_path = os.path.join(settings.BASE_DIR, "dataset", "AAPL_10y_OHLCV.csv")
        msft_scaler_path = os.path.join(settings.BASE_DIR, "dataset", "MSFT_10y_OHLCV.csv")
            
            
        scaler = StandardScaler()
        aapl_scaler = fit_scaler(aapl_scaler_path, scaler)
        msft_scaler = fit_scaler(msft_scaler_path, scaler)
        
        aapl_model_instance = model_holder.Model(self.aapl_model, aapl_scaler)
        msft_model_instance = model_holder.Model(self.msft_model, msft_scaler)

            
        model_holder.models["AAPL"] = aapl_model_instance
        model_holder.models["MSFT"] = msft_model_instance
