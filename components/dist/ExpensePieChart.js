"use strict";
exports.__esModule = true;
exports.ExpensePieChart = exports.options = void 0;
var react_1 = require("react");
var react_google_charts_1 = require("react-google-charts");
exports.options = {
  title: "Expense Tracker",
};
function ExpensePieChart(_a) {
  var totalExpense = _a.totalExpense,
    totalIncome = _a.totalIncome,
    totalBalance = _a.totalBalance;
  var data = react_1.useMemo(
    function () {
      return [
        ["Source", "Amount"],
        ["Income", totalIncome],
        ["Expenses", totalExpense],
        ["Balance", totalBalance],
      ];
    },
    [totalExpense, totalIncome, totalBalance],
  );
  return React.createElement(react_google_charts_1.Chart, {
    chartType: "PieChart",
    data: data,
    options: exports.options,
    width: "100%",
    style: { margin: "1rem" },
  });
}
exports.ExpensePieChart = ExpensePieChart;
