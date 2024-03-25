import { Source, Transaction } from "@prisma/client";

// Transaction Types Enumeration
export enum TransactionType {
  income = "Income",
  expense = "Expense",
  investment = "Investment",
  receivable = "Receivable",
}

// Transaction Data Type
export type TransactionDataType = Transaction & {
  source: Source;
};

// Source Type for creating and editing sources
export interface SourceInputType {
  name: string;
  type: TransactionType; // Leveraging the TransactionType enum
}

// Transaction Input Type for creating and editing transactions
export interface TransactionInputType {
  amount: number;
  received: boolean;
  sourceId: string;
  createdAt?: Date; // Optional, used for edits
}

// API Response Type for uniform API responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}


export type { Source };
