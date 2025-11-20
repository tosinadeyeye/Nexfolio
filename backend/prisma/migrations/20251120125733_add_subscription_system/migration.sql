-- AlterTable
ALTER TABLE "provider" ADD COLUMN "subscriptionEndDate" DATETIME;
ALTER TABLE "provider" ADD COLUMN "subscriptionStartDate" DATETIME;

-- CreateTable
CREATE TABLE "subscription_history" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "providerId" INTEGER NOT NULL,
    "tier" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subscription_history_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
