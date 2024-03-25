// components/EditTransactionModal.tsx
import { TransactionDataType } from "@/types"; // Ensure this import matches your file structure
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

  const handleSave = () => {
    editIncome(editedIncome);
    setIsEditModalVisible(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedIncome((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value, 10) : value,
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
          id="source-name"
          name="source"
          label="Source Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedIncome.source.name}
          onChange={(e) =>
            setEditedIncome((prev) => ({
              ...prev,
              source: { ...prev.source, name: e.target.value },
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
