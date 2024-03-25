import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Calculate the current date and the date 30 days from now
    const startDate = dayjs().toISOString();
    const endDate = dayjs().add(30, 'day').toISOString();

    // Fetch transactions, for Income transactions ignore the date range
    const result = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            // Include all transactions of type "Income" regardless of the date
            source: {
              type: "Income", // Assuming 'Income' is the correct identifier in your database
            },
          },
          {
            // For other transactions, apply the date range filter
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
                    not: "Income", // Exclude "Income" transactions from this date filter
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        source: true, // Include source details
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err); // Changed to console.error for better error logging
    res.status(500).json({
      error: "Error occurred while getting transactions.", // Changed 'err' to 'error' for consistency
    });
  }
};

export default getTransactions;
