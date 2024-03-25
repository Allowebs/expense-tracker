import { TransactionDataType } from "@/types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface EditTransactionModalProps {
  income: TransactionDataType;
  editIncome: (data: TransactionDataType) => void;
  isEditModalVisible: boolean;
  setIsEditModalVisible: (isVisible: boolean) => void;
}

const style = {
  position: "absolute" as "absolute",
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

  const handleClose = () => {
    setIsEditModalVisible(false);
  };

  const handleSave = async () => {
    // Prepare the transaction data for the API call, excluding the 'source' object
    const updatePayload = {
      amount: editedIncome.amount,
      createdAt: editedIncome.createdAt,
      received: editedIncome.received,
      // Assuming the source hasn't changed, so we just ensure 'sourceId' is included
      sourceId: editedIncome.source.id,
    };

    const response = await fetch(`/api/transaction/${editedIncome.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePayload),
    });

    if (response.ok) {
      // Assuming the API returns the updated transaction with the source object included
      const updatedTransaction = await response.json();
      editIncome(updatedTransaction); // Update state with the returned transaction
      setIsEditModalVisible(false);
    } else {
      console.error("Failed to update transaction");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedIncome((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? parseInt(value, 10)
          : name === "createdAt"
            ? new Date(value)
            : value,
    }));
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
          Edit Transaction
        </Typography>
        <TextField
          margin="dense"
          id="amount"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={editedIncome.amount}
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
          InputLabelProps={{
            shrink: true,
          }}
          value={
            editedIncome.createdAt instanceof Date
              ? editedIncome.createdAt.toISOString().split("T")[0]
              : editedIncome.createdAt
          }
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="source-name"
          name="sourceId"
          label="Source ID"
          type="text"
          fullWidth
          variant="outlined"
          value={editedIncome.sourceId}
          onChange={(e) =>
            setEditedIncome((prev) => ({
              ...prev,
              sourceId: e.target.value,
            }))
          }
        />
        <Button onClick={handleSave} sx={{ mt: 2, mb: 1 }} variant="contained">
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditTransactionModal;
