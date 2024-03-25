// components/IncomeTable.tsx
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
  TableRow
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";
import { CreateSourceModal } from "./CreateSourceModal";
import EditTransactionModal from "./EditTransactionModal";

type IncomeTableType = {
  incomes: TransactionDataType[];
  setIncomes: React.Dispatch<React.SetStateAction<TransactionDataType[]>>;
};

export const IncomeTable = ({ incomes, setIncomes }: IncomeTableType) => {
  const [isCreatePayerModalVisible, setIsCreatePayerModalVisible] =
    useState(false);
  const [isAddIncomeModalVisible, setIsAddIncomeModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingIncome, setEditingIncome] =
    useState<TransactionDataType | null>(null);

  const addIncome = (data: TransactionDataType) => {
    setIncomes((prevIncomes) => [...prevIncomes, data]);
  };

  const deleteIncome = async (id: string) => {
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Error deleting transaction");
      // Filter out the deleted expense from the local state to update the UI
      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const editIncome = (data: TransactionDataType) => {
    setIncomes((prevIncomes) =>
      prevIncomes.map((income) => (income.id === data.id ? data : income))
    );
  };

  const handleEdit = (income: TransactionDataType) => {
    setEditingIncome(income);
    setIsEditModalVisible(true);
  };

  return (
    <Card>
      <CardHeader
        title={TransactionType.income}
        subheader={`Total - ${incomes.reduce(
          (acc, income) => acc + income.amount,
          0
        )}`}
        subheaderTypographyProps={{ style: { fontWeight: "bold" } }}
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes.map((income) => (
                <TableRow key={income.id}>
                  {/* Check if income.source is defined before accessing its name */}
                  <TableCell>
                    {income.source ? income.source.name : "Unknown Source"}
                  </TableCell>
                  <TableCell>
                    {dayjs(income.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="right">{income.amount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteIncome(income.id)}>
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
        <Button onClick={() => setIsCreatePayerModalVisible(true)}>
          Create Payer
        </Button>
        <Button onClick={() => setIsAddIncomeModalVisible(true)}>
          Add Income
        </Button>
      </CardActions>
      <CreateSourceModal
        source={TransactionType.income}
        isCreateSourceModalVisible={isCreatePayerModalVisible}
        setIsCreateSourceModalVisible={setIsCreatePayerModalVisible}
      />
      <AddTransactionModal
        source={TransactionType.income}
        addTransaction={addIncome}
        isAddSourceModalVisible={isAddIncomeModalVisible}
        setIsAddSourceModalVisible={setIsAddIncomeModalVisible}
      />
      {editingIncome && (
        <EditTransactionModal
          income={editingIncome}
          editIncome={editIncome}
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      )}
    </Card>
  );
};
