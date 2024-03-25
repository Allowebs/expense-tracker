import { TransactionDataType, TransactionType } from "@/types";
import { CardContent, CardHeader, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
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

  const addReceivable = (data: TransactionDataType) => {
    setReceivables((prevReceivable) => [...prevReceivable, data]);
  };

  return (
    <Card>
      <CardHeader
        title={TransactionType.receivable}
        subheader={`Total - ${receivables.reduce(
          (acc, receivable) => acc + receivable.amount,
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
                <TableCell>Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivables.map((receivable) => {
                return (
                  <TableRow key={receivable.id}>
                    <TableCell>{receivable.source.name}</TableCell>
                    <TableCell>
                      {dayjs(receivable.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">{receivable.amount}</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Card>
  );
};
