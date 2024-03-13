import { Request, Response, NextFunction } from 'express';
import { startQuiz, getQuizInstructions, submitAnswer, resetProgress, completequiz } from '../services/quiz.services';
import { prisma } from '../services/user.services';

export const quizInstructions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const instructionsAndRules = await getQuizInstructions();
    res.status(200).send(instructionsAndRules);
  } catch (error) {
    console.error('Error retrieving quiz instructions:', error);
    res.status(500).send('Failed to retrieve quiz instructions and rules.');
  }
};


export const TostartQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
  
    const result = await startQuiz( );
    res.json(result);
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
};

export const TosubmitAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question_id = parseInt(req.params.question_id);
    const user_id = parseInt(req.params.user_id);
    const { user_answer } = req.body;


    const previousAnswer = await prisma.quiz.findFirst({
      where: {
        question_id: question_id,
        user_id: user_id,
      },
    });

    if (previousAnswer) {
      return res.status(400).json({ error: 'You are not allowed to answer the same question more than once' });
    }

  
    const result = await submitAnswer(question_id, user_id, user_answer);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error submitting answer:', error);
    if (error.message === 'UserId not found' || error.message === 'QuestionId not found') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to submit answer userId or questionId not found' });
    }
  }
};

export const ToresetProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const result = await resetProgress(user_id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({ error: 'Failed to reset progress invalid userId' });
  }
};

export const completeQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const result = await completequiz(user_id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error completing quiz:', error);
    res.status(500).json({ error: 'Failed to complete quiz' });
  }
};
