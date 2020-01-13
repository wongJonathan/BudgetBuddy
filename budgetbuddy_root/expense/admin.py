from django.contrib import admin
from .models import Expense


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('expenseName', 'value', 'payPeriodType')

admin.site.register(Expense, ExpenseAdmin)
