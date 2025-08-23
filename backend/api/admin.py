from django.contrib import admin

# Register your models here.
from .models import Ticker, StockPrediction

admin.site.register(Ticker)
admin.site.register(StockPrediction)