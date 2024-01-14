import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { questions } from "../src/controllers/questions";

export const getQuestions = async (req: Request, res: Response) => {
    for (let question of questions) {
      await prisma.question.create({
        data: question
      });
    }
    }
    