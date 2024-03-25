import { AppHeader } from "@/components/AppHeader";
import { ExpensePieChart } from "@/components/ExpensePieChart";
import { ExpenseTable } from "@/components/ExpenseTable";
import { IncomeTable } from "@/components/IncomeTable";
import { ReceivableTable } from "@/components/ReceivableTable";
import styles from "@/styles/Home.module.css";
import { TransactionDataType, TransactionType } from "@/types";
import { getTransactions } from "@/utils/getTransactions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PrismaClient } from "@prisma/client";
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
      (transaction: { source: { type: TransactionType } }) =>
        transaction.source.type === TransactionType.income
    )
  );
  const [expenses, setExpenses] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: { source: { type: TransactionType } }) =>
        transaction.source.type === TransactionType.expense
    )
  );
  const [receivables, setReceivables] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: { source: { type: TransactionType } }) =>
        transaction.source.type === TransactionType.receivable
    )
  );

  const onMonthChangeHandler = async (month: number, year: number) => {
    const response = await axios.get(
      `${process.env.API_URL}/api/transaction/get/${month}/${year}`
    );
    const data = response.data;
    setIncomes(
      data.filter(
        (transaction: TransactionDataType) =>
          transaction.source.type === TransactionType.income
      )
    );
    setExpenses(
      data.filter(
        (transaction: TransactionDataType) =>
          transaction.source.type === TransactionType.expense
      )
    );
    setReceivables(
      data.filter(
        (transaction: TransactionDataType) =>
          transaction.source.type === TransactionType.receivable
      )
    );
  };

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
          <AppHeader onMonthChangeHandler={onMonthChangeHandler} />
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
                  {dayjs(new Date()).format("DD-MM-YYYY")}
                </Typography>
                <ExpensePieChart
                  totalIncome={incomes.reduce(
                    (acc, income) => acc + income.amount,
                    0
                  )}
                  totalExpense={expenses.reduce(
                    (acc, expense) => acc + expense.amount,
                    0
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} py={5}>
              <Grid item xs={12}>
                <IncomeTable incomes={incomes} setIncomes={setIncomes} />
              </Grid>
              <Grid item xs={12}>
                <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
              </Grid>
              <Grid item xs={12}>
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
  const currentDate = new Date();
  const prisma = new PrismaClient();

  const response = await getTransactions(
    prisma,
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );
  return {
    props: {
      transactions: JSON.parse(JSON.stringify(response))
    }
  };
}
