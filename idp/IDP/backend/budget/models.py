from django.db import models

# Create your models here.

# Category Model
class Category(models.Model):
    CATEGORY_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
        ('savings', 'Savings/Investment'),
    ]
    
    name = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=10, choices=CATEGORY_TYPES)

    def __str__(self):
        return self.name

# Transaction Model
class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
        ('savings', 'Savings/Investment'),
    ]

    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    notes = models.TextField(blank=True, null=True)
    is_recurring = models.BooleanField(default=False)  # Annual recurring flag
    currency = models.CharField(max_length=3, default="INR")

    def __str__(self):
        return f"{self.title} - {self.amount} {self.currency}"

# Budget Model
class Budget(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.PositiveIntegerField()  # 1-12 for Jan-Dec
    year = models.PositiveIntegerField()

    class Meta:
        unique_together = ("category", "month", "year")

    def __str__(self):
        return f"{self.category.name} - {self.month}/{self.year} - {self.amount}"

# Investment Model
class Investment(models.Model):
    INVESTMENT_TYPES = [
        ('stock', 'Stock'),
        ('mutual_fund', 'Mutual Fund'),
        ('fd', 'Fixed Deposit'),
    ]

    name = models.CharField(max_length=255)  # Stock or MF name
    investment_type = models.CharField(max_length=15, choices=INVESTMENT_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateField()
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE)  # Links to a savings transaction

    def __str__(self):
        return f"{self.name} ({self.investment_type}) - {self.amount}"

# CSV Import Model
class CSVImport(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processed', 'Processed'),
        ('failed', 'Failed'),
    ]

    file_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    error_message = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.file_name} - {self.status}"

