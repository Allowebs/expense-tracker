import { TransactionDataType, TransactionType } from "@/types";
import { CardContent, CardHeader, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";
import { CreateSourceModal } from "./CreateSourceModal";

type InvestmentTableType = {
  investments: TransactionDataType[];
  setInvestments: React.Dispatch<React.SetStateAction<TransactionDataType[]>>;
};

export const InvestmentTable = ({
  investments,
  setInvestments
}: InvestmentTableType) => {
  const [
    isCreateInvestmentSourceModalVisible,
    setIsCreateInvestmentSourceModalVisible
  ] = useState<boolean>(false);
  const [isAddInvestmentModalVisible, setIsAddInvestmentModalVisible] =
    useState<boolean>(false);

  const addInvestment = (data: TransactionDataType) => {
    setInvestments((prevInvestments) => [...prevInvestments, data]);
  };

  return (
    <Card>
      <CardHeader
        title={TransactionType.investment}
        subheader={`Total - ${investments.reduce(
          (acc, investment) => acc + investment.amount,
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investments.map((investment) => {
                return (
                  <TableRow key={investment.id}>
                    <TableCell>{investment.source.name}</TableCell>
                    <TableCell>
                      {dayjs(investment.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">{investment.amount}</TableCell>
                  </TableRow>
                );
              })}
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
    </Card>
  );
};
