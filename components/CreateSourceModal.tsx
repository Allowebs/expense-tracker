// components/CreateSourceModal.tsx
import { TransactionType } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

type CreateSourceModalType = {
  source: TransactionType;
  isCreateSourceModalVisible: boolean;
  setIsCreateSourceModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateSourceModal = ({
  source,
  isCreateSourceModalVisible,
  setIsCreateSourceModalVisible,
}: CreateSourceModalType) => {
  const [isSourceCreated, setIsSourceCreated] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const cardHeaderTitle =
    source === TransactionType.income
      ? "Créer un payeur"
      : source === TransactionType.expense
        ? "Créer un bénéficiaire"
        : source === TransactionType.receivable
          ? "Créer une source de créances"
          : "Créer une source d'investissement";
  const cardHeaderSubHeader =
    source === TransactionType.income
      ? "Créez la source de laquelle vous recevrez le paiement."
      : source === TransactionType.expense
        ? "Créez la source à laquelle vous avez dépensé votre argent."
        : source === TransactionType.receivable
          ? "Créez la source à laquelle vous devez de l'argent"
          : "Créez la source dans laquelle vous avez investi votre argent.";

  const createSource = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/source/create`,
        {
          name,
          type: source,
        },
      );
      if (response.status === 200) {
        setIsCreateSourceModalVisible(false);
        setIsSourceCreated(true);
        setName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={isCreateSourceModalVisible}
        onClose={() => setIsCreateSourceModalVisible(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: 400,
          }}
        >
          <CardHeader
            title={cardHeaderTitle}
            subheader={cardHeaderSubHeader}
            subheaderTypographyProps={{ style: { fontSize: 14 } }}
            action={
              <IconButton onClick={() => setIsCreateSourceModalVisible(false)}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <TextField
              required
              id={`${source.toLowerCase()}-source-name`}
              label="Name"
              size="medium"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button onClick={createSource}>Create {source} source</Button>
          </CardActions>
        </Card>
      </Modal>
      <Snackbar
        open={isSourceCreated}
        autoHideDuration={3000}
        onClose={() => setIsSourceCreated(false)}
      >
        <Alert severity="success">{`${source} source créée avec succès !`}</Alert>
      </Snackbar>
    </>
  );
};
