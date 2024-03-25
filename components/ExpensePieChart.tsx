import { useMemo } from "react";
import { Chart } from "react-google-charts";

type ExpensePieChartType = {
  totalIncome: number;
  totalExpense: number;
};

export const options = {
  title: "Expense Tracker",
};

export function ExpensePieChart({
  totalExpense,
  totalIncome,
}: ExpensePieChartType) {
  const data = useMemo(() => {
    return [
      ["Source", "Amount"],
      ["Income", totalIncome],
      ["Expenses", totalExpense],
    ];
  }, [totalExpense, totalIncome]);

  return (
    <Chart chartType="PieChart" data={data} options={options} width={"100%"} />
  );
}
