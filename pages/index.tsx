import { AppHeader } from "@/components/AppHeader";
import { ExpensePieChart } from "@/components/ExpensePieChart";
import { ExpenseTable } from "@/components/ExpenseTable";
import { IncomeTable } from "@/components/IncomeTable";
import { ReceivableTable } from "@/components/ReceivableTable";
import styles from "@/styles/Home.module.css";
import { TransactionDataType, TransactionType } from "@/types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dayjs from "dayjs";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [incomes, setIncomes] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: TransactionDataType) =>
        transaction.source.type === TransactionType.income
    )
  );
  const [expenses, setExpenses] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: TransactionDataType) =>
        transaction.source.type === TransactionType.expense
    )
  );
  const [receivables, setReceivables] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: TransactionDataType) =>
        transaction.source.type === TransactionType.receivable
    )
  );

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page for the Expense Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Container>
          <AppHeader />
          <Grid container>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="h3" fontWeight="700">
                  Expense Tracker
                </Typography>
                <Typography color={"gray"} variant="h6">
                  This app is built for you to manage your income and expenses
                  with ease.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontWeight="500"
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}>
                  <CalendarMonthIcon style={{ marginRight: 10 }} />
                  from&nbsp;{dayjs().format("DD-MM-YYYY")}&nbsp;to&nbsp;
                  {dayjs().add(30, "day").format("DD-MM-YYYY")}
                </Typography>
                <ExpensePieChart
                  totalExpense={expenses.reduce(
                    (acc, expense) => acc + expense.amount,
                    0
                  )}
                  totalBalance={0}
                  totalIncome={incomes.reduce(
                    (acc, income) => acc + income.amount,
                    0
                  )}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight="500">
                      Income
                    </Typography>
                    <Typography variant="h6" color="gray">
                      {incomes.reduce((acc, income) => acc + income.amount, 0)}{" "}
                      $
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight="500">
                      Expenses
                    </Typography>
                    <Typography variant="h6" color="gray">
                      {expenses.reduce(
                        (acc, expense) => acc + expense.amount,
                        0
                      )}
                      $
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} py={5} style={{ height: "100%" }}>
              <Grid item style={{ height: "100%" }} xs={12}>
                <IncomeTable incomes={incomes} setIncomes={setIncomes} />
              </Grid>
              <Grid item style={{ height: "100%" }} xs={12}>
                <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
              </Grid>
              <Grid item style={{ height: "100%" }} xs={12}>
                <ReceivableTable
                  receivables={receivables}
                  setReceivables={setReceivables}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const apiUrl = `${process.env.API_URL}/api/transaction/get`;
  // Example: Adjust to include query parameters if your API supports filtering by dates or types
  const response = await axios.get(apiUrl, {
    params: {
      // Example params, adjust according to your API's capability
      startDate: dayjs().toISOString(),
      endDate: dayjs().add(30, "day").toISOString()
    }
  });
  const transactions = response.data;

  return {
    props: {
      transactions
    }
  };
}
