
import { NextFunction, Request, Response, response} from 'express'
import { prismaClient } from '../..';
import  {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { questions } from './questions';
import { Prisma, PrismaClient } from '@prisma/client';


export const signup = async (req: Request, res: Response) => {

const { user_name, password, email,  date_registered } = req.body;

let user = await prismaClient.user.findFirst({where: {email}})
if (user) {
    throw Error('user already exists')
}
if (!user_name || !password || !email) {
    throw Error('Please enter all fields');
}
 if (password.length < 6) {
throw console.error('Password must be a least 6 characters long');
}
  
user = await prismaClient.user.create({
    data:{
        user_name,
        password: hashSync(password, 10),
        email,
        date_registered
    }
})
res.json(user)
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    
    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user) {
        throw Error('user does not exists')
    }
    if (!compareSync(password, user.password)) {
        throw Error('incorrect password')
    }
    const token = jwt.sign({
userId: user.user_id
    }, JWT_SECRET)
    res.json({user, token})
    }


export const logout = async (req: Request, res: Response) => {
  res.clearCookie('jwtToken'); 
  res.status(200).json({ message: 'Logged out successfully' });
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prismaClient.user.findMany();
    res.status(200).json({ data: allUsers });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await prismaClient.$disconnect();
  }
};

export const seedQuestions = async (req: Request, res: Response) => {
  for (let question of questions) {
    const { question_text, options, correct_answer } = question;

    try {

      await prismaClient.question.create({
        data: {
          question_text,
          options: { set: options }, 
          correct_answer,
        },
      });
      console.log(`Question seeded successfully: ${question_text}`);
    } catch (error) {
      console.error(`Error seeding question: ${question_text}`, error);
    }
  }
  res.json(questions)
};


export const getQuestions = async (req: Request, res: Response) => {
  try {
    const allQuestions = await prismaClient.question.findMany();
    res.json(questions)
    res.status(200).json({ data: allQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  } finally {
    await prismaClient.$disconnect();
  }

};


export const quizInstructions = async (req: Request, res: Response) => {
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

export const startQuiz = async (req:Request, res:Response, next: NextFunction) => {  
  
  try {
    const user_id = parseInt(req.params.user_id);
    const quizzes = await prismaClient.question.findMany()
    res.status(200).json({ message: 'Quiz started successfully' });
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
}