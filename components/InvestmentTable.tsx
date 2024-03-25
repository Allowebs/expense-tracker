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
import React, { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";
import { CreateSourceModal } from "./CreateSourceModal";
import EditTransactionModal from "./EditTransactionModal";

type InvestmentTableType = {
  investments: TransactionDataType[];
  setInvestments: React.Dispatch<React.SetStateAction<TransactionDataType[]>>;
};

export const InvestmentTable = ({
  investments,
  setInvestments,
}: InvestmentTableType) => {
  const [
    isCreateInvestmentSourceModalVisible,
    setIsCreateInvestmentSourceModalVisible,
  ] = useState<boolean>(false);
  const [isAddInvestmentModalVisible, setIsAddInvestmentModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingInvestment, setEditingInvestment] =
    useState<TransactionDataType | null>(null);

  const addInvestment = (data: TransactionDataType) => {
    setInvestments((prevInvestments) => [...prevInvestments, data]);
  };

  const deleteInvestment = (id: string) => {
    setInvestments((prevInvestments) =>
      prevInvestments.filter((investment) => investment.id !== id),
    );
  };

  const editInvestment = (data: TransactionDataType) => {
    setInvestments((prevInvestments) =>
      prevInvestments.map((investment) =>
        investment.id === data.id ? data : investment,
      ),
    );
  };

  const handleEdit = (investment: TransactionDataType) => {
    setEditingInvestment(investment);
    setIsEditModalVisible(true);
  };

  return (
    <Card>
      <CardHeader
        title={TransactionType.investment}
        subheader={`Total - ${investments.reduce(
          (acc, investment) => acc + investment.amount,
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
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell>{investment.source.name}</TableCell>
                  <TableCell>
                    {dayjs(investment.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="right">{investment.amount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(investment)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteInvestment(investment.id)}>
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
        <Button onClick={() => setIsCreateInvestmentSourceModalVisible(true)}>
          Create Source
        </Button>
        <Button onClick={() => setIsAddInvestmentModalVisible(true)}>
          Add Investment
        </Button>
      </CardActions>
      <CreateSourceModal
        source={TransactionType.investment}
        isCreateSourceModalVisible={isCreateInvestmentSourceModalVisible}
        setIsCreateSourceModalVisible={setIsCreateInvestmentSourceModalVisible}
      />
      <AddTransactionModal
        source={TransactionType.investment}
        addTransaction={addInvestment}
        isAddSourceModalVisible={isAddInvestmentModalVisible}
        setIsAddSourceModalVisible={setIsAddInvestmentModalVisible}
      />
      {editingInvestment && (
        <EditTransactionModal
          income={editingInvestment} // You may need to adjust the prop naming and handling in EditTransactionModal for clarity
          editIncome={editInvestment}
          isEditModalVisible={isEditModalVisible}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      )}
    </Card>
  );
};

export default InvestmentTable;
