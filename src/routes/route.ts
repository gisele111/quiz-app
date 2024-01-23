import express from 'express';
import { createUserController, getData, single, updateData, deleteData, login, logout } from "../controllers/user.controller";
import authenticateBearerToken from '../auth';
import { startQuiz, quizInstructions, submitAnswer, resetProgress } from "../controllers/quiz.controller";
import { seedQuestions, getQuestions } from '../../prisma/seed';
const router = express.Router();

router.post('/createUser', createUserController);
router.get('/getAllUsers', getData);
router.get('/getSingleUser/:id', single);  
router.patch('/updateUser/:id', updateData);  
router.delete('/deleteUser/:id', deleteData);  
router.post('/login', login);
router.get('/logout', logout);
router.post('/startquiz/:user_id', startQuiz);
router.get('/quizInstructions', quizInstructions);
router.post('/submitAnswer/:user_id/:question_id', submitAnswer);
router.post('/seedQuestions', seedQuestions);
router.get('/getQuestions', getQuestions);
router.post('/resetProgress/:user_id', resetProgress);

export default router;
