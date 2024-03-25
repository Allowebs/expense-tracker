import { TransactionDataType, TransactionType } from "@/types";
import { Card, CardContent, CardHeader, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";
import { CreateSourceModal } from "./CreateSourceModal";

type ExpenseTableType = {
  expenses: TransactionDataType[];
  setExpenses: React.Dispatch<React.SetStateAction<TransactionDataType[]>>;
};

export const ExpenseTable = ({ expenses, setExpenses }: ExpenseTableType) => {
  const [isCreatePayeeModalVisible, setIsCreatePayeeModalVisible] =
    useState<boolean>(false);
  const [isAddExpenseModalVisible, setIsAddExpenseModalVisible] =
    useState<boolean>(false);

  const addExpense = (data: TransactionDataType) => {
    setExpenses((prevExpenses) => [...prevExpenses, data]);
  };

  return (
    <Card>
      <CardHeader
        title={TransactionType.expense}
        subheader={`Total - ${expenses.reduce(
          (acc, expenses) => acc + expenses.amount,
          0
        )}`}
        subheaderTypographyProps={{
          style: {
            fontWeight: "bold"
          }
        }}
      />
      <CardContent style={{ padding: 0 }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 320, overflowY: "scroll" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => {
                return (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.source.name}</TableCell>
                    <TableCell>
                      {dayjs(expense.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">{expense.amount}</TableCell>
                  </TableRow>
                );
              })}
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
    </Card>
  );
};
