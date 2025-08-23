from django.db import models

# Create your models here.
class Ticker(models.Model):
    name = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class StockPrediction(models.Model):
    ticker = models.ForeignKey(Ticker, on_delete=models.CASCADE, related_name='predictions')
    prediction_date = models.DateTimeField(auto_now_add=True)
    predicted_value = models.FloatField()

    def __str__(self):
        return f"{self.ticker} - {self.prediction_date} - {self.predicted_value}"