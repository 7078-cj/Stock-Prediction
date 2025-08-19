
import numpy as np
from sklearn.preprocessing import StandardScaler

models = {}

class Model:
    def __init__(self, model):
        self.model = model
        
    def predict(ticker, input_data):
        if ticker not in models:
            return "Model for ticker not found"
        
        if input_data.shape[1] != 4:
            return "Input data must have 4 features"
        
        if input_data.shape[0] < 60:
            return "Input data must have at least 60 rows"
        
        input_data = input_data.values(dtype=np.float32)
        
        
        scaler = StandardScaler()
        scaled_input_data = scaler.transform(input_data)
        
        X = scaled_input_data.reshape(1, 60, 4)
        
        model = models[ticker]
    
        prediction_scaled = model.predict(X)
        
        dummy_array = np.zeros((prediction_scaled.shape[0], input_data.shape[1]))
        dummy_array[:, 3] = prediction_scaled[:, 0]
        prediction = scaler.inverse_transform(dummy_array)[:, 3]
        print(f'prediction {ticker}: {prediction}')

        return prediction
        
    