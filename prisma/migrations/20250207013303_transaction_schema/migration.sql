-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "mcc" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currencyCode" INTEGER NOT NULL,
    "comment" TEXT
);
