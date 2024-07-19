/*
  Warnings:

  - You are about to alter the column `exp` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "realname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" REAL NOT NULL DEFAULT 0,
    "life" INTEGER NOT NULL DEFAULT 5
);
INSERT INTO "new_User" ("email", "exp", "id", "level", "life", "password", "phone", "realname", "username") SELECT "email", "exp", "id", "level", "life", "password", "phone", "realname", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
