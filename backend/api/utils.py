import pandas as pd
from sklearn.preprocessing import StandardScaler

def fit_scaler(dataset_path,scaler=None):
    data = pd.read_csv(dataset_path)
    data['Date'] = pd.to_datetime(data['Date'])

    cols = ['Open', 'High', 'Low', 'Close', 'Volume']

    for col in cols:
        data[col] = pd.to_numeric(data[col].str.replace(',', ''), errors='coerce')
            
    stock_data = data.filter(['Open', 'High', 'Low', 'Close'])
    stock_data = stock_data.fillna(method='ffill')  
    stock_data = stock_data.dropna()
    dataset = stock_data.values
    scaled_data = scaler.fit_transform(dataset)
    return scaled_data