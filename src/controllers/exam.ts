import { NextFunction, Request, Response, response} from 'express'
import { prismaClient } from '../..';
import  {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { questions } from './questions';
import { Prisma, PrismaClient } from '@prisma/client';

import { Quiz } from "@prisma/client";
import { error } from 'console';

const startQuiz = async (req:Request, res:Response, next:NextFunction)
try {
    const quizId = 0;
    const quiz = await prismaClient.quiz.findUnique({
      where: {
        quiz_id: quizId
      },
    
      }
      if (!quiz) {
       throw error;
      }
      res.send
    });

}