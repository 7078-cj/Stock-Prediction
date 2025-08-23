from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import UserSerializer
from .. import model_holder
import pandas as pd
import os
from django.conf import settings
from ..utils import data_prep

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
        
@api_view(['POST'])
def registerUser(request):
     if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            return Response({'message': 'User registered successfully'})
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def test(request):
    
    if request.method == 'GET':
        apple_model = model_holder.models.get("AAPL")
        aapl_dataset_path = os.path.join(settings.BASE_DIR, "dataset", "AAPL_10y_OHLCV.csv")
        aaple_data = pd.read_csv(aapl_dataset_path)
        latest_60 = aaple_data.tail(60)
        X_input = data_prep(latest_60)
        prediction = apple_model.predict(X_input)
        aaple_data_json = aaple_data.to_json(orient="records")
        
        
        
    
        return Response({'prediction': prediction,
                         'dataset': aaple_data_json})