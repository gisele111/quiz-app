/*
  Warnings:

  - You are about to drop the column `quiz_id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_created_by_fkey";

-- DropForeignKey
ALTER TABLE "QuizScore" DROP CONSTRAINT "QuizScore_quiz_id_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "quiz_id",
ALTER COLUMN "question_text" DROP NOT NULL,
ALTER COLUMN "correct_answer" DROP NOT NULL;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "QuizScore";

-- CreateTable
CREATE TABLE "UserAnswer" (
    "answer_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_answer" TEXT NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "QuizInstructions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizInstructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSession" (
    "session_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "score" INTEGER,

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_question_id_user_id_key" ON "UserAnswer"("question_id", "user_id");

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
