import { Prisma, PrismaClient } from "@prisma/client";
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
      case "PUT":
        const updateTransaction = await prisma.transaction.update({
          where: { id: transactionId },
          data: req.body,
        });
        return res.json(updateTransaction);

      case "DELETE":
        const deleteTransaction = await prisma.transaction.delete({
          where: { id: transactionId },
        });
        return res.json(deleteTransaction);

      default:
        res.setHeader("Allow", ["DELETE", "PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known request errors from Prisma
      console.error("Known error:", error.meta);
      return res.status(500).json({ message: error.message });
    } else if (error instanceof Error) {
      // General error handling
      console.error("Error:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
    // Fallback for other types of errors
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}
