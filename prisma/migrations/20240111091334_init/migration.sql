-- CreateTable
CREATE TABLE "Quiz" (
    "quiz_id" SERIAL NOT NULL,
    "quiz_name" TEXT NOT NULL,
    "description" TEXT,
    "created_by" INTEGER NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "question_text" TEXT NOT NULL,
    "options" TEXT[],
    "correct_answer" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answer_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "user_answer" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "QuizScore" (
    "score_id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score_value" INTEGER NOT NULL,

    CONSTRAINT "QuizScore_pkey" PRIMARY KEY ("score_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_question_id_user_id_key" ON "Answer"("question_id", "user_id");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;
