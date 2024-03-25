import { TransactionDataType, TransactionType } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { default as React, useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";
import { CreateSourceModal } from "./CreateSourceModal";
import EditTransactionModal from "./EditTransactionModal"; // Make sure you have this component

type ExpenseTableType = {
  expenses: TransactionDataType[];
  setExpenses: React.Dispatch<React.SetStateAction<TransactionDataType[]>>;
};

export const ExpenseTable = ({ expenses, setExpenses }: ExpenseTableType) => {
  const [isCreatePayeeModalVisible, setIsCreatePayeeModalVisible] =
    useState<boolean>(false);
  const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingExpense, setEditingExpense] =
    useState<TransactionDataType | null>(null);

  const addExpense = (data: TransactionDataType) => {
    setExpenses((prevExpenses) => [...prevExpenses, data]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    );
  };

  const editExpense = (data: TransactionDataType) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => (expense.id === data.id ? data : expense)),
    );
  };

  const handleEdit = (expense: TransactionDataType) => {
    setEditingExpense(expense);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting transaction");
      // Filter out the deleted expense from the local state to update the UI
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Card>
      <CardHeader
        title={TransactionType.expense}
        subheader={`Total - ${expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0,
        )}`}
        subheaderTypographyProps={{ style: { fontWeight: "bold" } }}
      />
      <CardContent style={{ padding: 0 }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 320, overflowY: "scroll" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount($)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.source.name}</TableCell>
                  <TableCell>
                    {dayjs(expense.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="right">{expense.amount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(expense)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteExpense(expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button onClick={() => setIsCreatePayeeModalVisible(true)}>
          Create Payee
        </Button>
        <Button onClick={() => setIsAddExpenseModalVisible(true)}>
          Add Expense
        </Button>
      </CardActions>
      <CreateSourceModal
        source={TransactionType.expense}
        isCreateSourceModalVisible={isCreatePayeeModalVisible}
        setIsCreateSourceModalVisible={setIsCreatePayeeModalVisible}
      />
      <AddTransactionModal
        source={TransactionType.expense}
        addTransaction={addExpense}
        isAddSourceModalVisible={isAddExpenseModalVisible}
        setIsAddSourceModalVisible={setIsAddExpenseModalVisible}
      />
      {editingExpense && (
        <EditTransactionModal
          income={editingExpense}
          editIncome={editExpense}
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      )}
    </Card>
  );
};
