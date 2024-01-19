import { Request, Response } from 'express';
import { prisma } from '../src/services/user.services';
import { questions } from './questions';

/*export const getQuestions = async (req: Request, res: Response) => {
    for (let question of questions) {
      await prisma.question.create({
        data: question
      });
    }
    }
   */

    export const seedQuestions = async (req: Request, res: Response) => {
      for (let question of questions) {
        const { question_text, options, correct_answer } = question;
    
        try {
    
          await prisma.question.create({
            data: question
          });
          console.log(`Question seeded successfully: ${question_text}`);
        } catch (error) {
          console.error(`Error seeding question: ${question_text}`, error);
        }
      
      return questions;
    };

    
const getQuestions = async (req: Request, res: Response) => {
  try {
    const allQuestions = await prisma.question.findMany();
    res.json(questions)
    res.status(200).json({ data: allQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  } finally {
    await prisma.$disconnect();
  }

}; 
    }


    /* import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../secrets";
import { prisma } from "../services/user.services";
import * as jwt from 'jsonwebtoken';
const authenticateBearerToken = async( req: Request, res: Response, next: NextFunction) => {


  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Bearer token not provided' });
  }
try {
  const payload = jwt.verify(token, JWT_SECRET) as any
const user = await prisma.user.findFirst({where: {user_id: payload.userId}})
if (!user) {
  return res.status(401).json({ error: 'Unauthorized - Bearer token not provided' }); 
}
req.user = user
next()
}
catch(error) {
   return res.status(401).json({ error: 'Unauthorized - Bearer token not provided' });
}
}
export default authenticateBearerToken*/