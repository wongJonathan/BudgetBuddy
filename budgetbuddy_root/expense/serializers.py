from rest_framework import serializers
from .models import Expense, ExpenseTag


class ExpenseTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseTag
        fields = ('id', 'tagName', 'total', 'identifier')


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'expenseName', 'value', 'payPeriodType', 'expenseTag')
