import React, { ReactElement } from "react";

interface ExpenseIncome {

}

const ExpenseIncome = (): ReactElement => {

  console.log('render');

  return (
    <div>
      {/* <Typography variant="h5">{`Total income: ${income.current}`}</Typography>
      <Typography variant="h6">{`Total spent: ${totalSpent}`}</Typography> */}
    </div>
  );
}