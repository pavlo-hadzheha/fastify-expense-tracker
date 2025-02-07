/*
  Warnings:

  - You are about to drop the column `time` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mcc" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currencyCode" INTEGER NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Transaction" ("amount", "comment", "currencyCode", "id", "mcc", "userId") SELECT "amount", "comment", "currencyCode", "id", "mcc", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
