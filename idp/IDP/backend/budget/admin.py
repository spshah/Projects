from django.contrib import admin
from .models import Category, Transaction, Budget, Investment, CSVImport

# Register your models here.

admin.site.register(Category)
admin.site.register(Transaction)
admin.site.register(Budget)
admin.site.register(Investment)
admin.site.register(CSVImport)

