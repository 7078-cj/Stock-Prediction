from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .. import model_holder
import pandas as pd
import os
from django.conf import settings
from ..utils import data_prep
from ..models import Ticker


        
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_prediction(request,ticker):
    if request.method != 'GET':
        return Response({'error': 'Method not allowed'}, status=405)
    
    if ticker in model_holder.models:
        dataset_path = os.path.join(settings.BASE_DIR, "current_data", f'{ticker}_60d_OHLCV.csv')
        data = pd.read_csv(dataset_path)
        prediction = Ticker.objects.get(name=ticker).predictions.last().predicted_value
        all_predictions = Ticker.objects.get(name=ticker).predictions.all()
        latest_info = data.tail(1).to_dict(orient="records")[0]
        latest_7 = data.tail(7)
        
        
        return Response ({'info':latest_info, 
                          'prediction':prediction, 
                          '7d_data':latest_7.to_dict(orient="records"), 
                          'ticker': ticker, 
                          "all_predictions": [{"date":pred.prediction_date , "prediction": pred.predicted_value} for pred in all_predictions]})
    else:
        return Response({'error': 'Model not found'}, status=404)