// prisma-clean.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cleanDatabase() {
  // Add deletion commands for all your tables
  // Note: Adjust the table names and deletion order according to your schema
  // and relationships to avoid constraint violations.
  await prisma.transaction.deleteMany({});
  await prisma.source.deleteMany({});
  // Repeat the above line for other entities, ensuring you respect foreign key constraints

  console.log("Database cleaned successfully.");
}

cleanDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
