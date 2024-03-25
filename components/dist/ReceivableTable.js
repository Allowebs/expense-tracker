"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.ReceivableTable = void 0;
// components/ReceivableTable.tsx
var types_1 = require("@/types");
var Delete_1 = require("@mui/icons-material/Delete");
var Edit_1 = require("@mui/icons-material/Edit");
var material_1 = require("@mui/material");
var dayjs_1 = require("dayjs");
var react_1 = require("react");
var AddTransactionModal_1 = require("./AddTransactionModal");
var CreateSourceModal_1 = require("./CreateSourceModal");
var EditTransactionModal_1 = require("./EditTransactionModal");
exports.ReceivableTable = function (_a) {
  var receivables = _a.receivables,
    setReceivables = _a.setReceivables;
  var _b = react_1.useState(false),
    isCreateReceivableSourceModalVisible = _b[0],
    setIsCreateReceivableSourceModalVisible = _b[1];
  var _c = react_1.useState(false),
    isAddReceivableModalVisible = _c[0],
    setIsAddReceivableModalVisible = _c[1];
  var _d = react_1.useState(false),
    isEditModalVisible = _d[0],
    setIsEditModalVisible = _d[1];
  var _e = react_1.useState(null),
    editingReceivable = _e[0],
    setEditingReceivable = _e[1];
  var addReceivable = function (data) {
    setReceivables(function (prevReceivable) {
      return __spreadArrays(prevReceivable, [data]);
    });
  };
  var deleteReceivable = function (id) {
    setReceivables(function (prevReceivable) {
      return prevReceivable.filter(function (receivable) {
        return receivable.id !== id;
      });
    });
  };
  var editReceivable = function (data) {
    setReceivables(function (prevReceivable) {
      return prevReceivable.map(function (receivable) {
        return receivable.id === data.id ? data : receivable;
      });
    });
  };
  var togglePaidStatus = function (id, paidStatus) {
    setReceivables(function (prevReceivable) {
      return prevReceivable.map(function (receivable) {
        return receivable.id === id
          ? __assign(__assign({}, receivable), { received: paidStatus })
          : receivable;
      });
    });
  };
  var handleEdit = function (receivable) {
    setEditingReceivable(receivable);
    setIsEditModalVisible(true);
  };
  var handleDelete = function (id) {
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
            deleteReceivable(id);
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
  return react_1["default"].createElement(
    material_1.Card,
    { style: { margin: "1rem" } },
    react_1["default"].createElement(material_1.CardHeader, {
      title: "Receivable",
      subheader:
        "Total - " +
        receivables.reduce(function (acc, receivable) {
          return acc + receivable.amount;
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
          null,
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
                "Pay\u00E9",
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
            receivables.map(function (receivable) {
              return react_1["default"].createElement(
                material_1.TableRow,
                { key: receivable.id },
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  receivable.source.name,
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  dayjs_1["default"](receivable.createdAt).format("DD-MM-YYYY"),
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  { align: "right" },
                  receivable.amount,
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  react_1["default"].createElement(material_1.Checkbox, {
                    checked: receivable.received,
                    onChange: function (event) {
                      return togglePaidStatus(
                        receivable.id,
                        event.target.checked,
                      );
                    },
                  }),
                ),
                react_1["default"].createElement(
                  material_1.TableCell,
                  null,
                  react_1["default"].createElement(
                    material_1.IconButton,
                    {
                      onClick: function () {
                        return handleEdit(receivable);
                      },
                    },
                    react_1["default"].createElement(Edit_1["default"], null),
                  ),
                  react_1["default"].createElement(
                    material_1.IconButton,
                    {
                      onClick: function () {
                        return handleDelete(receivable.id);
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
            return setIsCreateReceivableSourceModalVisible(true);
          },
        },
        "Cr\u00E9er une source",
      ),
      react_1["default"].createElement(
        material_1.Button,
        {
          onClick: function () {
            return setIsAddReceivableModalVisible(true);
          },
        },
        "Ajouter un compte \u00E0 recevoir",
      ),
    ),
    react_1["default"].createElement(CreateSourceModal_1.CreateSourceModal, {
      source: types_1.TransactionType.receivable,
      isCreateSourceModalVisible: isCreateReceivableSourceModalVisible,
      setIsCreateSourceModalVisible: setIsCreateReceivableSourceModalVisible,
    }),
    react_1["default"].createElement(
      AddTransactionModal_1.AddTransactionModal,
      {
        source: types_1.TransactionType.receivable,
        addTransaction: addReceivable,
        isAddSourceModalVisible: isAddReceivableModalVisible,
        setIsAddSourceModalVisible: setIsAddReceivableModalVisible,
      },
    ),
    editingReceivable &&
      react_1["default"].createElement(EditTransactionModal_1["default"], {
        income: editingReceivable,
        editIncome: editReceivable,
        isEditModalVisible: isEditModalVisible,
        setIsEditModalVisible: setIsEditModalVisible,
      }),
  );
};
