import csv
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import CSVImport, Transaction, Category
from .forms import CSVImportForm

@api_view(['POST'])
def import_csv(request):
    if request.method == 'POST':
        form = CSVImportForm(request.FILES)
        if form.is_valid():
            csv_file = request.FILES['csv_file']
            # Save the CSV import record with status 'pending'
            csv_import = CSVImport.objects.create(file_name=csv_file.name, status='pending')

            try:
                decoded_file = csv_file.read().decode('utf-8-sig')
                reader = csv.reader(decoded_file.splitlines())
                
                # Process the CSV file and save transactions to the DB
                for row in reader:
                    category_name, title, amount, date, transaction_type = row
                    category, created = Category.objects.get_or_create(name=category_name)
                    
                    Transaction.objects.create(
                        title=title,
                        amount=amount,
                        date=date,
                        transaction_type=transaction_type,
                        category=category
                    )

                csv_import.status = 'processed'
                csv_import.save()
                return Response({"message": "CSV imported successfully!"}, status=status.HTTP_200_OK)
            
            except Exception as e:
                csv_import.status = 'failed'
                csv_import.error_message = str(e)
                csv_import.save()
                return Response({"error": "Failed to import CSV", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"error": "Invalid form data"}, status=status.HTTP_400_BAD_REQUEST)

