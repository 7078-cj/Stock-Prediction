import os
import tensorflow as tf
from django.apps import AppConfig
from django.conf import settings

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
       
        aapl_model_path = os.path.join(settings.BASE_DIR, "models", "AAPL_model.h5")
        msft_model_path = os.path.join(settings.BASE_DIR, "models", "MSFT_model.h5")
        self.aapl_model = tf.keras.models.load_model(aapl_model_path, compile=False)
        self.msft_model = tf.keras.models.load_model(msft_model_path, compile=False)

       
        from . import model_holder

        
        aapl_model_instance = model_holder.Model(self.aapl_model)
        msft_model_instance = model_holder.Model(self.msft_model)

        
        model_holder.models["AAPL"] = aapl_model_instance
        model_holder.models["MSFT"] = msft_model_instance
