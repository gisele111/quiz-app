
import { NextFunction, Request, Response} from 'express'
import { prisma } from '../services/user.services';


export const quizInstructions = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
     
      const instructionsAndRules = 
        `"Welcome to the Quiz!
        
        Instructions:
        1. Read each question carefully before answering.
        2. You will have a limited time to complete the quiz.
        3. Choose the correct answer for each question.
        4. Submit your answers before the time runs out.
  
        Rules:
    
        1. Do not use any external resources or assistance.
        2. Follow the quiz guidelines and instructions at all times.
        
        Enjoy the quiz and good luck!"`
    
  
      res.status(200).send(instructionsAndRules);
    } catch (error) {
     
      res.status(500).send('Failed to retrieve quiz instructions and rules.');
    }
  };
  
  
  export const startQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = parseInt(req.params.user_id);
      const questions = await prisma.question.findMany({
        select: {
          question_id: true,
          question_text: true,
          options: true,
        },
      });

      for (const currentQuestion of questions) {
        res.write(JSON.stringify({ question: currentQuestion }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      res.status(500).json({ error: 'Failed to start quiz' });
    } finally {
      res.end(); 
      await prisma.$disconnect();
    }
  };
  
  
export const submitAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question_id = parseInt(req.params.question_id);
    const user_id = parseInt(req.params.user_id);
    const {user_answer } = req.body;

    if (isNaN(question_id) || isNaN(user_id) || typeof user_answer !== 'string') {
      return res.status(400).json({ error: 'Invalid input data' });
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
      return res.status(404).json({ error: 'Question not found' });
    } else{

    const isCorrect = user_answer === questions?.correct_answer;

   const submittedAnswer = await prisma.quiz.create({ 
      data: {
        user_id,
        question_id,
        user_answer,
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
          current_score: (user.current_score || 0)+ (isCorrect ? 1 : 0),
        },
      });

      res.status(200).json({ message: 'Answer submitted successfully', submittedAnswer });
    } else {
      res.status(404).json({ error: 'User not found' });
    }}
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  } finally {
    await prisma.$disconnect();
  }
};

