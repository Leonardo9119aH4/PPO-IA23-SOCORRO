-- CreateTable
CREATE TABLE "AuthKey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AuthKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthKey_key_key" ON "AuthKey"("key");
