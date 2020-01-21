from django.db import models


class ExpenseTag(models.Model):
    tagName = models.CharField(max_length=256)
    total = models.PositiveIntegerField()
    identifier = models.CharField(max_length=9)


class Expense(models.Model):

    class PayPeriodType(models.IntegerChoices):
        YEAR = 1
        MONTH = 12
        SEMIMONTHLY = 23
        BIWEEKLY = 26
        WEEKLY = 52
        DAILY = 365

    expenseName = models.CharField(max_length=256)
    value = models.PositiveIntegerField()
    payPeriodType = models.IntegerField(choices=PayPeriodType.choices)
    expenseTag = models.ForeignKey(ExpenseTag, on_delete=models.CASCADE, null=True)

    def _str_(self):
        return self.expenseName
