import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Calculate the current date and the date 30 days from now
    const startDate = dayjs().toISOString();
    const endDate = dayjs().add(30, 'day').toISOString();

    // Fetch transactions that were created within this date range
    const result = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { source: true },
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "Error occurred while getting transactions.",
    });
  }
};

export default getTransactions;
