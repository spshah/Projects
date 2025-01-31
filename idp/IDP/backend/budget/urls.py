from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TransactionViewSet, BudgetViewSet, InvestmentViewSet, CSVImportViewSet

# Create router for automatic API routing
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'budgets', BudgetViewSet)
router.register(r'investments', InvestmentViewSet)
router.register(r'csv-imports', CSVImportViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/expenses-trend/<str:period>/', views.ExpenseTrendView.as_view(), name='expense-trend'),

]

