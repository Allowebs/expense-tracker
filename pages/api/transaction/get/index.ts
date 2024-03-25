import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Calculate the current date and the date 30 days from now
    const startDate = dayjs().toISOString();
    const endDate = dayjs().add(30, "day").toISOString();

    const result = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            // Transactions whose source name contains "Carte de Credit"
            source: {
              name: {
                contains: "Carte de Credit",
              },
            },
          },
          {
            // Transactions of type "Income" or "Receivable" regardless of the date
            OR: [
              {
                source: {
                  type: "Income",
                },
              },
              {
                source: {
                  type: "Receivable",
                },
              },
            ],
          },
          {
            // Other transactions within the date range, excluding "Income" 
            // and transactions with "Carte de Credit" in the source name
            AND: [
              {
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
              {
                NOT: {
                  OR: [
                    {
                      source: {
                        type: "Income",
                      },
                    },
                    {
                      source: {
                        type: "Receivable",
                      },
                    },
                    {
                      source: {
                        name: {
                          contains: "Carte de Credit",
                        },
                      },
                    },
                  ],
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

export default getTransactions;