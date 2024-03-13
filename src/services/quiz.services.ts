import { prisma } from "./user.services";

const getQuizInstructions = async () => {
  try {
    const instructionsAndRules = `"Welcome to the Quiz!
        
        Instructions:
        1. Read each question carefully before answering.
        2. You will have two hour to complete the quiz.
        3. Choose the correct answer for each question.
        4. Submit your answers before the time runs out.
  
        Rules:
    
        1. Do not use any external resources or assistance.
        2. Follow the quiz guidelines and instructions at all times.
        
        Enjoy the quiz and good luck!"`;

    return instructionsAndRules;
  } catch (error) {
    throw new Error('Failed to retrieve quiz instructions and rules.');
  }
};

const startQuiz = async ( ) => {
  try {
    const questions = await prisma.question.findMany({
      select: {
        question_id: true,
        question_text: true,
        options: true,
      },
    });

    return { questions };
  } catch (error) {
    throw new Error('Failed to start quiz');
  } finally {
    await prisma.$disconnect();
  }
};

const submitAnswer = async (question_id: number, user_id: number, user_answer: string) => {
  try {
    if (!question_id || !user_id) {
      throw new Error('Invalid input data');
    }

    const questions = await prisma.question.findUnique({
      where: {
        question_id,
      },
      select: {
        correct_answer: true,
      },
    });

    if (!questions) {
      throw new Error('Question not found');
    }

    const isCorrect = user_answer === questions.correct_answer;

    const submittedAnswer = await prisma.quiz.create({
      data: {
        user_id,
        question_id,
        user_answer,
        score: isCorrect ? 1 : 0,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        user_id,
      },
    });

    if (user) {
      await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          current_score: (user.current_score || 0) + (isCorrect ? 1 : 0),
        },
      });

      return { message: 'Answer submitted successfully', submittedAnswer };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const resetProgress = async (user_id: number) => {
  try {
    if (!user_id) {
      throw new Error('Invalid user ID');
  
    }

    await prisma.quiz.deleteMany({
      where: { user_id },
    });

    await prisma.user.update({
      where: { user_id },
      data: { current_score: 0 },
    });

    return { message: 'Progress reset successfully' };
  } catch (error) {
    console.log("Invalid user ID");
    throw new Error('Invalid user ID');
  } finally {
    await prisma.$disconnect();
  }
};

const completequiz = async (user_id: number) => {
  try {
    const userQuizzes = await prisma.quiz.findMany({
      where: {
        user_id,
      },
    });

    const totalScore = userQuizzes.reduce((acc, quiz) => acc + (quiz.score || 0), 0);
    const totalQuestions = userQuizzes.length;

    return { message: `Quiz completed successfully. Your total score is ${totalScore}/${totalQuestions}.`, totalScore };
  } catch (error) {
    throw new Error('Failed to complete quiz');
  }
};

export {
  getQuizInstructions,
  startQuiz,
  submitAnswer,
  resetProgress,
  completequiz
}
