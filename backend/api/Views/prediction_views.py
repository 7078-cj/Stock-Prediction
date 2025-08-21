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


        
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def info_prediction(request,ticker):
    if request.method != 'GET':
        return Response({'error': 'Method not allowed'}, status=405)
    
    if ticker in model_holder.models:
        model = model_holder.models.get(ticker)
        dataset_path = os.path.join(settings.BASE_DIR, "current_data", f'{ticker}_60d_OHLCV.csv')
        data = pd.read_csv(dataset_path)
        latest_60 = data.tail(60)
        X_input = data_prep(latest_60)
        prediction = model.predict(X_input)
        latest_info = data.tail(1).to_dict(orient="records")[0]
        latest_7 = data.tail(7)
        
        
        return Response ({'info':latest_info, 'prediction':prediction, '60d_data':latest_7.to_dict(orient="records"), 'ticker': ticker})
    else:
        return Response({'error': 'Model not found'}, status=404)