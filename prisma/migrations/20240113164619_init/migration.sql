/*
  Warnings:

  - You are about to drop the `QuizSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "QuizSession" DROP CONSTRAINT "QuizSession_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "QuizSession";

-- DropTable
DROP TABLE "UserAnswer";

-- CreateTable
CREATE TABLE "Quiz" (
    "quiz_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_answer" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "score" INTEGER,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_question_id_user_id_key" ON "Quiz"("question_id", "user_id");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
