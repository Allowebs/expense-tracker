// components/AddTransactionModal.tsx
import { Source, TransactionDataType, TransactionType } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

type AddTransactionModalType = {
  source: TransactionType;
  isAddSourceModalVisible: boolean;
  setIsAddSourceModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addTransaction: (data: TransactionDataType) => void;
};

export const AddTransactionModal = ({
  source,
  isAddSourceModalVisible,
  setIsAddSourceModalVisible,
  addTransaction,
}: AddTransactionModalType) => {
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [transactionDate, setTransactionDate] = useState<Date | null>(
    new Date(),
  );
  const [amount, setAmount] = useState<number>(0);
  const [isTransactionCreated, setIsTransactionCreated] =
    useState<boolean>(false);

  const createTransaction = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/transaction/create`,
        {
          sourceId: selectedSource?.id,
          amount,
          createdAt: transactionDate,
        },
      );
      if (response.status === 200) {
        setIsAddSourceModalVisible(false);
        setIsTransactionCreated(true);
        setSelectedSource(null);
        setAmount(0);
        addTransaction(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cardHeaderTitle = `Ajouter ${source}`;
  const cardHeaderSubHeader = `Ajoutez votre ${source} pour une date spécifique du mois.`;

  useEffect(() => {
    const getSourcesByType = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/api/source/get/${source}`,
        );
        const data: Source[] = response.data;
        setSources(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (isAddSourceModalVisible) {
      getSourcesByType();
    }
  }, [source, isAddSourceModalVisible]);

  return (
    <>
      <Modal
        open={isAddSourceModalVisible}
        onClose={() => setIsAddSourceModalVisible(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ width: 400 }}>
          <CardHeader
            title={cardHeaderTitle}
            subheader={cardHeaderSubHeader}
            subheaderTypographyProps={{ style: { fontSize: 14 } }}
            action={
              <IconButton onClick={() => setIsAddSourceModalVisible(false)}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Autocomplete
              id={`${source}-source`}
              renderInput={(params) => <TextField {...params} label="Source" />}
              options={sources}
              size="medium"
              fullWidth
              style={{ marginBottom: 20 }}
              onChange={(event, value) => setSelectedSource(value)}
              value={selectedSource}
              noOptionsText="No sources"
              getOptionLabel={(option: Source) => option.name}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={`${source} date`}
                format="DD-MM-YYYY"
                value={transactionDate ? dayjs(transactionDate) : null}
                onChange={(value) =>
                  setTransactionDate(
                    value && dayjs(value).isValid() ? value.toDate() : null,
                  )
                }
              />
            </LocalizationProvider>

            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel htmlFor={`${source}-source-amount`}>
                Montant
              </InputLabel>
              <OutlinedInput
                id={`${source}-source-amount`}
                label="Montant"
                size="medium"
                type="number"
                value={amount}
                onChange={(event) => setAmount(parseInt(event.target.value))}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button onClick={createTransaction}>Add {source}</Button>
          </CardActions>
        </Card>
      </Modal>
      <Snackbar
        open={isTransactionCreated}
        autoHideDuration={3000}
        onClose={() => setIsTransactionCreated(false)}
      >
        <Alert severity="success">{`${source} ajouté avec succès !`}</Alert>
      </Snackbar>
    </>
  );
};
