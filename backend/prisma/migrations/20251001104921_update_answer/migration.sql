/*
  Warnings:

  - You are about to drop the column `Answer` on the `Option` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Option" (
    "option_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "option" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "question_id" INTEGER NOT NULL,
    CONSTRAINT "Option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("question_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Option" ("option", "option_id", "question_id") SELECT "option", "option_id", "question_id" FROM "Option";
DROP TABLE "Option";
ALTER TABLE "new_Option" RENAME TO "Option";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
