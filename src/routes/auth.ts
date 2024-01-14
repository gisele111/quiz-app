import { Router } from "express";
import { login, logout, signup, getAllUsers, seedQuestions, quizInstructions, startQuiz, getQuestions } from '../controllers/auth'

const authRoutes:Router = Router()

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.get('/getallusers', getAllUsers)
authRoutes.post('/seedQuestions', seedQuestions)
authRoutes.get('/quizInstructions', quizInstructions)
authRoutes.get('/startQuiz ', startQuiz )
authRoutes.get('/getQuestions ', getQuestions )

export default authRoutes
