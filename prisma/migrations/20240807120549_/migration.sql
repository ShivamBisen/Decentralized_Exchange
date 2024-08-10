-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "solwalletid" TEXT,
    "inrwalletid" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inrwallet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Inrwallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solwallet" (
    "id" TEXT NOT NULL,
    "publickey" TEXT NOT NULL,
    "privatekey" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Solwallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inrwallet_userid_key" ON "Inrwallet"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Solwallet_userid_key" ON "Solwallet"("userid");

-- AddForeignKey
ALTER TABLE "Inrwallet" ADD CONSTRAINT "Inrwallet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solwallet" ADD CONSTRAINT "Solwallet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
