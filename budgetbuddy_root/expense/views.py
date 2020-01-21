from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ExpenseSerializer, ExpenseTagSerializer
from .models import Expense, ExpenseTag


class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        queryset = Expense.objects.all()
        expenseTagId = self.request.query_params.get('expenseTagId', None)
        if expenseTagId is not None:
            queryset = queryset.filter(expenseTag=expenseTagId)
        return queryset


class ExpenseTagView(viewsets.ModelViewSet):
    serializer_class = ExpenseTagSerializer
    queryset = ExpenseTag.objects.all()
