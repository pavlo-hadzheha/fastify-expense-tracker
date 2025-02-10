/*
  Warnings:

  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mcc" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "currencyCode" INTEGER NOT NULL,
    "comment" TEXT
);
INSERT INTO "new_Transaction" ("amount", "comment", "currencyCode", "id", "mcc", "timestamp", "userId") SELECT "amount", "comment", "currencyCode", "id", "mcc", "timestamp", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
