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
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
exports.__esModule = true;
exports.ExpenseTable = void 0;
// components/ExpenseTable.tsx
var types_1 = require("@/types");
var Delete_1 = require("@mui/icons-material/Delete");
var Edit_1 = require("@mui/icons-material/Edit");
var material_1 = require("@mui/material");
var dayjs_1 = require("dayjs");
var react_1 = require("react");
var AddTransactionModal_1 = require("./AddTransactionModal");
var CreateSourceModal_1 = require("./CreateSourceModal");
var EditTransactionModal_1 = require("./EditTransactionModal"); // Make sure you have this component
exports.ExpenseTable = function (_a) {
  var expenses = _a.expenses,
    setExpenses = _a.setExpenses;
  var _b = react_1.useState(false),
    isCreatePayeeModalVisible = _b[0],
    setIsCreatePayeeModalVisible = _b[1];
  var _c = react_1.useState(false),
    isAddExpenseModalVisible = _c[0],
    setIsAddExpenseModalVisible = _c[1];
  var _d = react_1.useState(false),
    isEditModalVisible = _d[0],
    setIsEditModalVisible = _d[1];
  var _e = react_1.useState(null),
    editingExpense = _e[0],
    setEditingExpense = _e[1];
  var addExpense = function (data) {
    setExpenses(function (prevExpenses) {
      return __spreadArrays(prevExpenses, [data]);
    });
  };
  var deleteExpense = function (id) {
    return __awaiter(void 0, void 0, void 0, function () {
      var response, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              fetch("/api/transaction/" + id, {
                method: "DELETE",
              }),
            ];
          case 1:
            response = _a.sent();
            if (!response.ok) throw new Error("Error deleting transaction");
            // Filter out the deleted expense from the local state to update the UI
            setExpenses(function (prevExpenses) {
              return prevExpenses.filter(function (expense) {
                return expense.id !== id;
              });
            });
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Failed to delete transaction:", error_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var editExpense = function (data) {
    setExpenses(function (prevExpenses) {
      return prevExpenses.map(function (expense) {
        return expense.id === data.id ? data : expense;
      });
    });
  };
  var handleEdit = function (expense) {
    setEditingExpense(expense);
    setIsEditModalVisible(true);
  };
  return react_1["default"].createElement(
    material_1.Card,
    { style: { margin: "1rem" } },
    react_1["default"].createElement(material_1.CardHeader, {
      title: types_1.TransactionType.expense,
      subheader:
        "Total - " +
        expenses.reduce(function (acc, expense) {
          return acc + expense.amount;
        }, 0),
      subheaderTypographyProps: { style: { fontWeight: "bold" } },
    }),
    react_1["default"].createElement(
      material_1.CardContent,
      { style: { padding: 0 } },
      react_1["default"].createElement(
        material_1.TableContainer,
        { component: material_1.Paper, sx: { maxHeight: "100%" } },
        react_1["default"].createElement(
          material_1.Table,
          { stickyHeader: true },
          react_1["default"].createElement(
            material_1.TableHead,
            null,
            react_1["default"].createElement(
              material_1.TableRow,
              null,
              react_1["default"].createElement(
                material_1.TableCell,
                null,
                "Source",
              ),
              react_1["default"].createElement(
                material_1.TableCell,
                null,
                "Date",
              ),
              react_1["default"].createElement(
                material_1.TableCell,
                { align: "right" },
                "Montant ($)",
              ),
              react_1["default"].createElement(
                material_1.TableCell,
                null,
                "Actions",
              ),
            ),
          ),
          react_1["default"].createElement(
            material_1.TableBody,
            null,
            expenses.map(function (expense) {
              return react_1["default"].createElement(
                material_1.TableRow,
                { key: expense.id },
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  expense.source.name,
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  dayjs_1["default"](expense.createdAt).format("DD-MM-YYYY"),
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  { align: "right" },
                  expense.amount,
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  react_1["default"].createElement(
                    material_1.IconButton,
                    {
                      onClick: function () {
                        return handleEdit(expense);
                      },
                    },
                    react_1["default"].createElement(Edit_1["default"], null),
                  ),
                  react_1["default"].createElement(
                    material_1.IconButton,
                    {
                      onClick: function () {
                        return deleteExpense(expense.id);
                      },
                    },
                    react_1["default"].createElement(Delete_1["default"], null),
                  ),
                ),
              );
            }),
          ),
        ),
      ),
    ),
    react_1["default"].createElement(
      material_1.CardActions,
      null,
      react_1["default"].createElement(
        material_1.Button,
        {
          onClick: function () {
            return setIsCreatePayeeModalVisible(true);
          },
        },
        "Cr\u00E9er un b\u00E9n\u00E9ficiaire",
      ),
      react_1["default"].createElement(
        material_1.Button,
        {
          onClick: function () {
            return setIsAddExpenseModalVisible(true);
          },
        },
        "Ajouter une d\u00E9pense",
      ),
    ),
    react_1["default"].createElement(CreateSourceModal_1.CreateSourceModal, {
      source: types_1.TransactionType.expense,
      isCreateSourceModalVisible: isCreatePayeeModalVisible,
      setIsCreateSourceModalVisible: setIsCreatePayeeModalVisible,
    }),
    react_1["default"].createElement(
      AddTransactionModal_1.AddTransactionModal,
      {
        source: types_1.TransactionType.expense,
        addTransaction: addExpense,
        isAddSourceModalVisible: isAddExpenseModalVisible,
        setIsAddSourceModalVisible: setIsAddExpenseModalVisible,
      },
    ),
    editingExpense &&
      react_1["default"].createElement(EditTransactionModal_1["default"], {
        income: editingExpense,
        editIncome: editExpense,
        isEditModalVisible: isEditModalVisible,
        setIsEditModalVisible: setIsEditModalVisible,
      }),
  );
};
