from rest_framework import serializers
from .models import Category, Transaction, Budget, Investment, CSVImport

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'

class CSVImportSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVImport
        fields = '__all__'

