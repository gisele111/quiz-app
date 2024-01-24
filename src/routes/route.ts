import express from 'express';
import { createUserController, getData, single, updateData, deleteData, login, logout } from "../controllers/user.controller";
import authenticateBearerToken from '../middleware/auth';
import { TostartQuiz, quizInstructions, TosubmitAnswer, ToresetProgress, completeQuiz } from "../controllers/quiz.controller";
import { seedQuestions, getQuestions } from '../../prisma/seed';
const router = express.Router();

router.post('/createUser', createUserController);
router.get('/getAllUsers',authenticateBearerToken, getData);
router.get('/getSingleUser/:id', authenticateBearerToken, single);  
router.patch('/updateUser/:id', updateData);  
router.delete('/deleteUser/:id', deleteData);  
router.post('/login', login);
router.get('/logout', authenticateBearerToken, logout);
router.get('/authenticateBearerToken', authenticateBearerToken);
router.post('/startquiz/:user_id', authenticateBearerToken, TostartQuiz);
router.get('/quizInstructions', authenticateBearerToken, quizInstructions);
router.post('/submitAnswer/:user_id/:question_id', authenticateBearerToken, TosubmitAnswer);
router.post('/seedQuestions', authenticateBearerToken, seedQuestions);
router.get('/getQuestions', authenticateBearerToken, getQuestions);
router.post('/resetProgress/:user_id', authenticateBearerToken, ToresetProgress);
router.post('/completeQuiz/:user_id', authenticateBearerToken, completeQuiz);

export default router;
