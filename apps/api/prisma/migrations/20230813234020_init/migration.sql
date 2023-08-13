-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "image_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0,
    "icon" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "investment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "account_id" TEXT,
    "category" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "type" TEXT,
    "price_per_quantity" REAL NOT NULL DEFAULT 0,
    "total_quantity" REAL NOT NULL DEFAULT 0,
    "total_paid_price" REAL NOT NULL DEFAULT 0,
    "total_price" REAL NOT NULL DEFAULT 0,
    "allocation" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "investment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "investment_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "investment_transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "investment_id" TEXT NOT NULL,
    "price_per_quantity" REAL NOT NULL,
    "price_paid" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "investment_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "investment_transaction_investment_id_fkey" FOREIGN KEY ("investment_id") REFERENCES "investment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "expense_user_id_idx" ON "expense"("user_id");

-- CreateIndex
CREATE INDEX "account_user_id_idx" ON "account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "investment_ticker_key" ON "investment"("ticker");

-- CreateIndex
CREATE INDEX "investment_user_id_idx" ON "investment"("user_id");

-- CreateIndex
CREATE INDEX "investment_account_id_idx" ON "investment"("account_id");

-- CreateIndex
CREATE INDEX "investment_transaction_user_id_idx" ON "investment_transaction"("user_id");

-- CreateIndex
CREATE INDEX "investment_transaction_investment_id_idx" ON "investment_transaction"("investment_id");
