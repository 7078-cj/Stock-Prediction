
import numpy as np
import pandas as pd


models = {}



class Model:
    def __init__(self, model,scaler):
        self.model = model
        self.scaler = scaler
        
    def predict(self,input_data):
        
        
        if input_data.shape[1] != 4:
            return "Input data must have 4 features"
        
        if input_data.shape[0] < 60:
            return "Input data must have at least 60 rows"
        
        
        scaled_input_data = self.scaler.transform(input_data)
        
        
        X = scaled_input_data[-60:].reshape(1, 60, 4)
        
        prediction_scaled =  self.model.predict(X)
        
        dummy_array = np.zeros((prediction_scaled.shape[0], input_data.shape[1]))
        dummy_array[:, 3] = prediction_scaled[:, 0]
        prediction = self.scaler.inverse_transform(dummy_array)[:, 3]
        
        print(f'prediction : {prediction}')
        return prediction

        
    