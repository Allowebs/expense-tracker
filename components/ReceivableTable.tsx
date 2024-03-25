// components/ReceivableTable.tsx
import { TransactionDataType, TransactionType } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
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

type ReceivableTableType = {
  receivables: TransactionDataType[];
  setReceivables: React.Dispatch<React.SetStateAction<TransactionDataType[]>>;
};

export const ReceivableTable = ({
  receivables,
  setReceivables
}: ReceivableTableType) => {
  const [
    isCreateReceivableSourceModalVisible,
    setIsCreateReceivableSourceModalVisible
  ] = useState<boolean>(false);
  const [isAddReceivableModalVisible, setIsAddReceivableModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingReceivable, setEditingReceivable] =
    useState<TransactionDataType | null>(null);

  const addReceivable = (data: TransactionDataType) => {
    setReceivables((prevReceivable) => [...prevReceivable, data]);
  };

  const deleteReceivable = (id: string) => {
    setReceivables((prevReceivable) =>
      prevReceivable.filter((receivable) => receivable.id !== id)
    );
  };

  const editReceivable = (data: TransactionDataType) => {
    setReceivables((prevReceivable) =>
      prevReceivable.map((receivable) =>
        receivable.id === data.id ? data : receivable
      )
    );
  };

  const togglePaidStatus = (id: string, paidStatus: boolean) => {
    setReceivables((prevReceivable) =>
      prevReceivable.map((receivable) =>
        receivable.id === id
          ? { ...receivable, received: paidStatus }
          : receivable
      )
    );
  };

  const handleEdit = (receivable: TransactionDataType) => {
    setEditingReceivable(receivable);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Error deleting transaction");
      deleteReceivable(id);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Receivable"
        subheader={`Total - ${receivables.reduce(
          (acc, receivable) => acc + receivable.amount,
          0
        )}`}
        subheaderTypographyProps={{ style: { fontWeight: "bold" } }}
      />
      <CardContent style={{ padding: 0 }}>
        <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount($)</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivables.map((receivable) => (
                <TableRow key={receivable.id}>
                  <TableCell>{receivable.source.name}</TableCell>
                  <TableCell>
                    {dayjs(receivable.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="right">{receivable.amount}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={receivable.received}
                      onChange={(event) =>
                        togglePaidStatus(receivable.id, event.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(receivable)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(receivable.id)}>
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
        <Button onClick={() => setIsCreateReceivableSourceModalVisible(true)}>
          Create Source
        </Button>
        <Button onClick={() => setIsAddReceivableModalVisible(true)}>
          Add Receivable
        </Button>
      </CardActions>
      <CreateSourceModal
        source={TransactionType.receivable}
        isCreateSourceModalVisible={isCreateReceivableSourceModalVisible}
        setIsCreateSourceModalVisible={setIsCreateReceivableSourceModalVisible}
      />
      <AddTransactionModal
        source={TransactionType.receivable}
        addTransaction={addReceivable}
        isAddSourceModalVisible={isAddReceivableModalVisible}
        setIsAddSourceModalVisible={setIsAddReceivableModalVisible}
      />
      {editingReceivable && (
        <EditTransactionModal
          income={editingReceivable} // Note: You might need to adjust the props and handling inside EditTransactionModal for different transaction types.
          editIncome={editReceivable}
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      )}
    </Card>
  );
};
