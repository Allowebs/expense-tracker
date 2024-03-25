"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var material_1 = require("@mui/material");
var dayjs_1 = require("dayjs"); // Make sure to have dayjs installed
var react_1 = require("react");
var style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};
var EditTransactionModal = function (_a) {
    var income = _a.income, editIncome = _a.editIncome, isEditModalVisible = _a.isEditModalVisible, setIsEditModalVisible = _a.setIsEditModalVisible;
    var _b = react_1.useState(income), editedIncome = _b[0], setEditedIncome = _b[1];
    var _c = react_1.useState(dayjs_1["default"](income.createdAt).format("YYYY-MM-DD")), createdAtInput = _c[0], setCreatedAtInput = _c[1];
    react_1.useEffect(function () {
        setEditedIncome(income);
        setCreatedAtInput(dayjs_1["default"](income.createdAt).format("YYYY-MM-DD"));
    }, [income]);
    var handleClose = function () {
        setIsEditModalVisible(false);
    };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatePayload, response, updatedTransaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatePayload = {
                        amount: editedIncome.amount,
                        createdAt: new Date(createdAtInput).toISOString(),
                        received: editedIncome.received,
                        sourceId: editedIncome.source.id // Ensure this matches the structure of your TransactionDataType
                    };
                    return [4 /*yield*/, fetch("/api/transaction/" + editedIncome.id, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatePayload)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    updatedTransaction = _a.sent();
                    // Call the editIncome function with the updated transaction data
                    // Adjust as necessary to fit the expected structure, particularly for dates
                    editIncome(__assign(__assign({}, updatedTransaction), { createdAt: new Date(updatedTransaction.createdAt) }));
                    setIsEditModalVisible(false);
                    return [3 /*break*/, 4];
                case 3:
                    console.error("Failed to update transaction");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleChange = function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        if (name === "createdAt") {
            setCreatedAtInput(value);
        }
        else {
            setEditedIncome(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = name === "amount" ? parseInt(value, 10) : value, _a)));
            });
        }
    };
    return (react_1["default"].createElement(material_1.Modal, { open: isEditModalVisible, onClose: handleClose, "aria-labelledby": "edit-transaction-modal-title", "aria-describedby": "edit-transaction-modal-description" },
        react_1["default"].createElement(material_1.Box, { sx: style },
            react_1["default"].createElement(material_1.Typography, { id: "edit-transaction-modal-title", variant: "h6", component: "h2" }, "Modifier la transaction"),
            react_1["default"].createElement(material_1.TextField, { margin: "dense", id: "amount", name: "amount", label: "Amount", type: "number", fullWidth: true, variant: "outlined", value: editedIncome.amount.toString(), onChange: handleChange }),
            react_1["default"].createElement(material_1.TextField, { margin: "dense", id: "createdAt", name: "createdAt", label: "Date", type: "date", fullWidth: true, variant: "outlined", InputLabelProps: { shrink: true }, value: createdAtInput, onChange: handleChange }),
            react_1["default"].createElement(material_1.Button, { onClick: handleSave, sx: { mt: 2, mb: 1 }, variant: "contained" }, "Save"))));
};
exports["default"] = EditTransactionModal;
