import { useMemo } from "react";
import { Chart } from "react-google-charts";

type ExpensePieChartType = {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
};

export const options = {
  title: "Expense Tracker",
};

export function ExpensePieChart({
  totalExpense,
  totalIncome,
  totalBalance,
}: ExpensePieChartType) {
  const data = useMemo(() => {
    return [
      ["Source", "Amount"],
      ["Income", totalIncome],
      ["Expenses", totalExpense],
      ["Balance", totalBalance],
    ];
  }, [totalExpense, totalIncome, totalBalance]);

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      style={{ margin: "1rem" }}
    />
  );
}
