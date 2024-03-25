// pages/api/transaction/[id].ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const transactionId = req.query.id;

  if (!transactionId || typeof transactionId !== "string") {
    return res
      .status(400)
      .json({ message: "Transaction ID must be provided and be a string." });
  }

  try {
    switch (req.method) {
      case "DELETE":
        // Delete a transaction
        const deleteTransaction = await prisma.transaction.delete({
          where: { id: transactionId },
        });
        return res.json(deleteTransaction);

      case "PUT":
        // Update a transaction
        const updateTransaction = await prisma.transaction.update({
          where: { id: transactionId },
          data: req.body,
        });
        return res.json(updateTransaction);

      default:
        res.setHeader("Allow", ["DELETE", "PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof Error) {
      // You can customize the error response based on error type or message
      // For instance, Prisma throws a PrismaClientKnownRequestError for known database errors
      console.error("Error handling transaction:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Fallback error response for unexpected errors
    console.error("Unexpected error handling transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
