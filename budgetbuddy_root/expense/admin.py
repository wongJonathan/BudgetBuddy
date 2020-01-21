from django.contrib import admin
from .models import Expense, ExpenseTag


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'expenseName', 'value', 'payPeriodType', 'expenseTag')

class ExpenseTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'tagName', 'total', 'identifier')


admin.site.register(Expense, ExpenseAdmin)
admin.site.register(ExpenseTag, ExpenseTagAdmin)
