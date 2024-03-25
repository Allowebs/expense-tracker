import { AppHeader } from "@/components/AppHeader";
import { ExpensePieChart } from "@/components/ExpensePieChart";
import { ExpenseTable } from "@/components/ExpenseTable";
import { IncomeTable } from "@/components/IncomeTable";
import { ReceivableTable } from "@/components/ReceivableTable";
import { TransactionDataType, TransactionType } from "@/types";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import axios from "axios";
import dayjs from "dayjs";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [incomes, setIncomes] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: TransactionDataType) =>
        transaction.source.type === TransactionType.income,
    ),
  );
  const [expenses, setExpenses] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: TransactionDataType) =>
        transaction.source.type === TransactionType.expense,
    ),
  );
  const [receivables, setReceivables] = useState<TransactionDataType[]>(
    props.transactions.filter(
      (transaction: TransactionDataType) =>
        transaction.source.type === TransactionType.receivable,
    ),
  );

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page for the Expense Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppHeader />
          <div className="mt-5">
            <div className="flex items-center text-lg font-medium my-5">
              <CalendarIcon className="w-5 h-5 mr-2 text-gray-700" />
              from {dayjs().format("DD-MM-YYYY")} to{" "}
              {dayjs().add(30, "day").format("DD-MM-YYYY")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div>
                <h2 className="text-xl font-medium">Income</h2>
                <p className="text-gray-600">
                  ${incomes.reduce((acc, income) => acc + income.amount, 0)}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-medium">Expenses</h2>
                <p className="text-gray-600">
                  ${expenses.reduce((acc, expense) => acc + expense.amount, 0)}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-medium">Balance</h2>
                <p className="text-gray-600">
                  $
                  {incomes.reduce((acc, income) => acc + income.amount, 0) -
                    expenses.reduce((acc, expense) => acc + expense.amount, 0)}
                </p>
              </div>
            </div>
            <ExpensePieChart
              totalExpense={expenses.reduce(
                (acc, expense) => acc + expense.amount,
                0,
              )}
              totalIncome={incomes.reduce(
                (acc, income) => acc + income.amount,
                0,
              )}
              totalBalance={0}
            />
          </div>
          <div
            className="grid grid-cols-1 gap-12 mt-5"
            style={{ gridTemplateColumns: "repeat(1, minmax(100%, auto))" }}
          >
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
              <IncomeTable incomes={incomes} setIncomes={setIncomes} />
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
              <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
              <ReceivableTable
                receivables={receivables}
                setReceivables={setReceivables}
              />
            </div>
          </div>
        </div>
      </div>
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
      endDate: dayjs().add(30, "day").toISOString(),
    },
  });
  const transactions = response.data;

  return {
    props: {
      transactions,
    },
  };
}
