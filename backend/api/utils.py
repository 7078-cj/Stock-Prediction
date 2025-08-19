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
    scaler = scaler.fit(dataset)
    return scaler

def data_prep(dataset):
    cols = ['Open', 'High', 'Low', 'Close', 'Volume']
    for col in cols:
        dataset[col] = pd.to_numeric(dataset[col].str.replace(',', ''), errors='coerce')
        
    stock_data = dataset.filter(['Open', 'High', 'Low', 'Close'])
    stock_data = stock_data.fillna(method='ffill')  
    stock_data = stock_data.dropna()
    
    return stock_data.values