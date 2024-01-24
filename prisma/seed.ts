import { Request, Response } from 'express';
import { prisma } from '../src/services/user.services';
    export const seedQuestions = async (req: Request, res: Response) => {
try {
      const questions = [
   
        {
          question_text: 'What is the capital of France?',
          options: ['London', 'Berlin', 'Paris', 'Madrid'],
          correct_answer: 'Paris'
        },
        {
          question_text: 'Who wrote the play "Romeo and Juliet"?',
          options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
          correct_answer: 'William Shakespeare'
        },
        {
          question_text: 'What is the chemical symbol for gold?',
          options: ['Au', 'Ag', 'Fe', 'Cu'],
          correct_answer: 'Au'
        },
        {
          question_text: 'Which planet is known as the Red Planet?',
          options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
          correct_answer: 'Mars'
        },
        {
          question_text: 'What is the square root of 64?',
          options: ['4', '6', '8', '10'],
          correct_answer: '8'
        },
       
        {
          question_text: 'Who painted the Mona Lisa?',
          options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
          correct_answer: 'Leonardo da Vinci'
        },
        {
          question_text: 'Which element has the chemical symbol "H"?',
          options: ['Helium', 'Hydrogen', 'Hassium', 'Hafnium'],
          correct_answer: 'Hydrogen'
        },
        {
          question_text: 'What is the largest continent by land area?',
          options: ['Africa', 'Europe', 'Asia', 'North America'],
          correct_answer: 'Asia'
        },
        {
          question_text: 'Who was the first person to step on the Moon?',
          options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Alan Shepard'],
          correct_answer: 'Neil Armstrong'
        },
        {
          question_text: 'What is the primary language spoken in Brazil?',
          options: ['English', 'Spanish', 'Portuguese', 'French'],
          correct_answer: 'Portuguese'
        },
        {
          question_text: 'What is the primary language spoken in Brazil?',
          options: ['English', 'Spanish', 'Portuguese', 'French'],
          correct_answer: 'Portuguese'
        },
      {
        question_text: 'Who was the first president of the United States?',
options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Abraham Lincoln'],
correct_answer: 'George Washington'
      },

      {
        question_text: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct_answer: "Tokyo"
      },

      {
        question_text: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Fe', 'Cu'],
        correct_answer: 'Au'
      },
      
      {
        question_text: 'What is the capital city of Rwanda?',
        options: ['kigali', 'Muhanga', 'Ruhango', 'Huye'],
        correct_answer: 'Au'
      }
      ];
     
          for (let question of questions) {
            const { question_text, options, correct_answer } = question;
            console.log(`Seeding question: ${question_text}`);
            await prisma.question.create({
            data: {
              question_text,
              options: { set: options }, 
              correct_answer,
            },
          });
          console.log('Question seeded successfully');
        } 
        return res.status(200).json({ message: 'Questions seeded successfully' });
      } catch (error) {
        console.error('Error seeding questions', error);
        return res.status(500).json({ error: 'Failed to seed questions' });
      }
    };
    
    
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const allQuestions = await prisma.question.findMany();
    res.status(200).json({ data: allQuestions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  } finally {
    await prisma.$disconnect();
  }

}; 



    


    