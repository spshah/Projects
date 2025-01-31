from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Transaction, Budget, Investment, CSVImport
from .serializers import CategorySerializer, TransactionSerializer, BudgetSerializer, InvestmentSerializer, CSVImportSerializer

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

class CSVImportViewSet(viewsets.ModelViewSet):
    queryset = CSVImport.objects.all()
    serializer_class = CSVImportSerializer



from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth, TruncYear
from .models import Transaction

class ExpenseTrendView(APIView):
    def get(self, request, period='monthly'):
        """
        Generate monthly/yearly trends for expenses
        :param period: either 'monthly' or 'yearly'
        """
        if period == 'monthly':
            trends = (Transaction.objects
                      .filter(category="expense")
                      .annotate(month=TruncMonth('date'))
                      .values('month')
                      .annotate(total_expenses=Sum('amount'))
                      .order_by('month'))
        elif period == 'yearly':
            trends = (Transaction.objects
                      .filter(category="expense")
                      .annotate(year=TruncYear('date'))
                      .values('year')
                      .annotate(total_expenses=Sum('amount'))
                      .order_by('year'))
        else:
            return Response({"error": "Invalid period"}, status=400)

        return Response(trends)

class ExpenseForecastView(APIView):
    def get(self, request):
        months = request.query_params.get('months', 3)  # Use last 3 months for moving average
        expenses = (Transaction.objects
                    .filter(category="expense")
                    .annotate(month=TruncMonth('date'))
                    .values('month')
                    .annotate(total_expenses=Sum('amount'))
                    .order_by('-month')[:int(months)])

        if not expenses:
            return Response({"error": "No data available for forecasting"}, status=400)

        avg_expense = sum([item['total_expenses'] for item in expenses]) / len(expenses)
        forecast = {'forecasted_expense': avg_expense}

        return Response(forecast)

