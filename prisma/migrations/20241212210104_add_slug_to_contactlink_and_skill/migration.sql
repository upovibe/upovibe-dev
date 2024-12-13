/*
  Warnings:

  - Added the required column `slug` to the `ContactLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "href" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContactLink" ("createdAt", "href", "id", "image", "name", "updatedAt") SELECT "createdAt", "href", "id", "image", "name", "updatedAt" FROM "ContactLink";
DROP TABLE "ContactLink";
ALTER TABLE "new_ContactLink" RENAME TO "ContactLink";
CREATE UNIQUE INDEX "ContactLink_slug_key" ON "ContactLink"("slug");
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "score" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Skill" ("createdAt", "id", "image", "name", "score", "updatedAt") SELECT "createdAt", "id", "image", "name", "score", "updatedAt" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
