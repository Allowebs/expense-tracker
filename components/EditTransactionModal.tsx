import { TransactionDataType } from "@/types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import dayjs from "dayjs"; // Make sure to have dayjs installed
import React, { useEffect, useState } from "react";

interface EditTransactionModalProps {
  income: TransactionDataType;
  editIncome: (data: TransactionDataType) => void;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (isVisible: boolean) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  income,
  editIncome,
  isEditModalVisible,
  setIsEditModalVisible,
}) => {
  const [editedIncome, setEditedIncome] = useState<TransactionDataType>(income);
  const [createdAtInput, setCreatedAtInput] = useState<string>(
    dayjs(income.createdAt).format("YYYY-MM-DD"),
  );

  useEffect(() => {
    setEditedIncome(income);
    setCreatedAtInput(dayjs(income.createdAt).format("YYYY-MM-DD"));
  }, [income]);

  const handleClose = () => {
    setIsEditModalVisible(false);
  };

  const handleSave = async () => {
    // Construct the payload with only direct fields of the Transaction model
    const updatePayload = {
      amount: editedIncome.amount,
      createdAt: new Date(createdAtInput).toISOString(),
      received: editedIncome.received,
      sourceId: editedIncome.source.id, // Ensure this matches the structure of your TransactionDataType
    };

    const response = await fetch(`/api/transaction/${editedIncome.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePayload),
    });

    if (response.ok) {
      const updatedTransaction = await response.json();
      // Call the editIncome function with the updated transaction data
      // Adjust as necessary to fit the expected structure, particularly for dates
      editIncome({
        ...updatedTransaction,
        createdAt: new Date(updatedTransaction.createdAt),
      });
      setIsEditModalVisible(false);
    } else {
      console.error("Failed to update transaction");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "createdAt") {
      setCreatedAtInput(value);
    } else {
      setEditedIncome((prev) => ({
        ...prev,
        [name]: name === "amount" ? parseInt(value, 10) : value,
      }));
    }
  };

  return (
    <Modal
      open={isEditModalVisible}
      onClose={handleClose}
      aria-labelledby="edit-transaction-modal-title"
      aria-describedby="edit-transaction-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="edit-transaction-modal-title"
          variant="h6"
          component="h2"
        >
          Modifier la transaction
        </Typography>
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={editedIncome.amount.toString()}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="createdAt"
          name="createdAt"
          label="Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={createdAtInput}
          onChange={handleChange}
        />
        <Button onClick={handleSave} sx={{ mt: 2, mb: 1 }} variant="contained">
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditTransactionModal;
