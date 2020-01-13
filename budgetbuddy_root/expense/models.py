from django.db import models


# Create your models here.
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

    def _str_(self):
        return self.expenseName
