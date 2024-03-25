// pages/api/transaction/get/[...slug].ts
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getTransactionsInRange = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    // Calculate start and end dates
    const startDate = dayjs().toISOString(); // Current date
    const endDate = dayjs().add(30, "day").toISOString(); // 30 days from current date

    const result = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            // For Income transactions, ignore the date range
            source: {
              type: "Income", // Match the string directly
            },
          },
          {
            // For other types, apply the date range filter
            AND: [
              {
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
              {
                source: {
                  type: {
                    not: "Income", // Match the string directly for not Income
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        source: true, // Include source details in the result
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error occurred while getting transactions.",
    });
  }
};

export default getTransactionsInRange;
