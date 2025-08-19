from django.contrib import admin

# Register your models here.
from .models import ticker, StockPrediction

admin.site.register(ticker)
admin.site.register(StockPrediction)