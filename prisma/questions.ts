export const questions = [
   
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
      }
      ];
      export const getRandomQuestion = (): any => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
      };
