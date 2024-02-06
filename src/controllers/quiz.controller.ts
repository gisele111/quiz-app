import { Request, Response, NextFunction } from 'express';
import { startQuiz, getQuizInstructions, submitAnswer, resetProgress, completequiz } from '../services/quiz.services';
import authenticateBearerToken from '../middleware/auth';

export const quizInstructions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const instructionsAndRules = await getQuizInstructions();
    res.status(200).send(instructionsAndRules);
  } catch (error) {
    res.status(500).send('Failed to retrieve quiz instructions and rules.');
  }
};


export const TostartQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
  
    const result = await startQuiz( );
    res.json(result);
  } catch (error) {

    res.status(500).json({ error: 'Failed to start quiz' });
  }
};

export const TosubmitAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question_id = parseInt(req.params.question_id);
    const user_id = parseInt(req.params.user_id);
    const { user_answer } = req.body;
    const result = await submitAnswer(question_id, user_id, user_answer);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
};

export const ToresetProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const result = await resetProgress(user_id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({ error: 'Failed to reset progress' });
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
