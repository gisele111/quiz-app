/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `question_text` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `correct_answer` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "QuizSession" DROP CONSTRAINT "QuizSession_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_user_id_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "question_text" SET NOT NULL,
ALTER COLUMN "correct_answer" SET NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_registered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
