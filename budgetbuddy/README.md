# Current Features:

## Expense Page:

### Purpose:

This page is meant for users to input there expenses whether for yearly, monthly, to daily reoccurence. Each expenes is first created by specifiying a tag (i.e food, maintence, rent) and adding an expense. Each expenese has a name, value, and the period at which the expense is paid at.

Notes on file structure:
    Might have components folder hold it by feature/routers.
        Each folder will have an index.js to get entire feature
    Within each router folder components can be grouped by subfeature
        This would include stuff like textboxes, graphs, images
        Depending on size will have their own index.js

Notes on application:
  Home screeen should displays allowances and graph showing spending vs making for specified time
  Toolbar has:
    Edit expenses
    Submit expense
    Create a shopping list
    Savings goals

What needs to be global:
  User's authentication
  Expenses
  Current spendings
  Income
  Separate income

