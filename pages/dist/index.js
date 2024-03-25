"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.getServerSideProps = void 0;
var AppHeader_1 = require("@/components/AppHeader");
var ExpensePieChart_1 = require("@/components/ExpensePieChart");
var ExpenseTable_1 = require("@/components/ExpenseTable");
var IncomeTable_1 = require("@/components/IncomeTable");
var ReceivableTable_1 = require("@/components/ReceivableTable");
var types_1 = require("@/types");
var icons_1 = require("@mui/x-date-pickers/icons");
var axios_1 = require("axios");
var dayjs_1 = require("dayjs");
var head_1 = require("next/head");
var react_1 = require("react");
function Home(props) {
  var _a = react_1.useState(
      props.transactions.filter(function (transaction) {
        return transaction.source.type === types_1.TransactionType.income;
      }),
    ),
    incomes = _a[0],
    setIncomes = _a[1];
  var _b = react_1.useState(
      props.transactions.filter(function (transaction) {
        return transaction.source.type === types_1.TransactionType.expense;
      }),
    ),
    expenses = _b[0],
    setExpenses = _b[1];
  var _c = react_1.useState(
      props.transactions.filter(function (transaction) {
        return transaction.source.type === types_1.TransactionType.receivable;
      }),
    ),
    receivables = _c[0],
    setReceivables = _c[1];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      head_1["default"],
      null,
      React.createElement("title", null, "Home"),
      React.createElement("meta", {
        name: "description",
        content: "Home Page for the Expense Tracker",
      }),
      React.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      React.createElement("link", { rel: "icon", href: "/favicon.ico" }),
    ),
    React.createElement(
      "div",
      { className: "main py-8" },
      React.createElement(
        "div",
        { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
        React.createElement(AppHeader_1.AppHeader, null),
        React.createElement(
          "div",
          { className: "mt-5" },
          React.createElement(
            "div",
            { className: "flex items-center text-lg font-medium my-5" },
            React.createElement(icons_1.CalendarIcon, {
              className: "w-5 h-5 mr-2 text-gray-700",
            }),
            "from ",
            dayjs_1["default"]().format("DD-MM-YYYY"),
            " to",
            " ",
            dayjs_1["default"]().add(30, "day").format("DD-MM-YYYY"),
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-5" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "h2",
                { className: "text-xl font-medium" },
                "Income",
              ),
              React.createElement(
                "p",
                { className: "text-gray-600" },
                "$",
                incomes.reduce(function (acc, income) {
                  return acc + income.amount;
                }, 0),
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "h2",
                { className: "text-xl font-medium" },
                "Expenses",
              ),
              React.createElement(
                "p",
                { className: "text-gray-600" },
                "$",
                expenses.reduce(function (acc, expense) {
                  return acc + expense.amount;
                }, 0),
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "h2",
                { className: "text-xl font-medium" },
                "Balance",
              ),
              React.createElement(
                "p",
                { className: "text-gray-600" },
                "$",
                incomes.reduce(function (acc, income) {
                  return acc + income.amount;
                }, 0) -
                  expenses.reduce(function (acc, expense) {
                    return acc + expense.amount;
                  }, 0),
              ),
            ),
          ),
          React.createElement(ExpensePieChart_1.ExpensePieChart, {
            totalExpense: expenses.reduce(function (acc, expense) {
              return acc + expense.amount;
            }, 0),
            totalIncome: incomes.reduce(function (acc, income) {
              return acc + income.amount;
            }, 0),
            totalBalance: 0,
          }),
        ),
        React.createElement(
          "div",
          {
            className: "grid grid-cols-1 gap-12 mt-5",
            style: { gridTemplateColumns: "repeat(1, minmax(100%, auto))" },
          },
          React.createElement(
            "div",
            { className: "bg-white shadow overflow-hidden sm:rounded-lg mt-5" },
            React.createElement(IncomeTable_1.IncomeTable, {
              incomes: incomes,
              setIncomes: setIncomes,
            }),
          ),
          React.createElement(
            "div",
            { className: "bg-white shadow overflow-hidden sm:rounded-lg mt-5" },
            React.createElement(ExpenseTable_1.ExpenseTable, {
              expenses: expenses,
              setExpenses: setExpenses,
            }),
          ),
          React.createElement(
            "div",
            { className: "bg-white shadow overflow-hidden sm:rounded-lg mt-5" },
            React.createElement(ReceivableTable_1.ReceivableTable, {
              receivables: receivables,
              setReceivables: setReceivables,
            }),
          ),
        ),
      ),
    ),
  );
}
exports["default"] = Home;
function getServerSideProps() {
  return __awaiter(this, void 0, void 0, function () {
    var apiUrl, response, transactions;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          apiUrl = process.env.API_URL + "/api/transaction/get";
          return [
            4 /*yield*/,
            axios_1["default"].get(apiUrl, {
              params: {
                // Example params, adjust according to your API's capability
                startDate: dayjs_1["default"]().toISOString(),
                endDate: dayjs_1["default"]().add(30, "day").toISOString(),
              },
            }),
          ];
        case 1:
          response = _a.sent();
          transactions = response.data;
          return [
            2 /*return*/,
            {
              props: {
                transactions: transactions,
              },
            },
          ];
      }
    });
  });
}
exports.getServerSideProps = getServerSideProps;
