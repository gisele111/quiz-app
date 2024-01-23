import { Request,Response } from 'express';
import { signup, getAllUsers, getSingleUser, updateSingleUser, deleteUser } from '../services/user.services';
import { prisma } from '../services/user.services';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import  {hashSync, compareSync} from 'bcrypt';

const createUserController = async (req: Request, res: Response) => {
    const { user_name, password, email } = req.body;
  
    try {
    
      if (!user_name || !password || !email) {
        return res.status(400).json({ message: 'Please enter all fields' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }

      const existingUser = await prisma.user.findFirst({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      const newUser = await signup( user_name, password, email );
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const getData = async(req:Request,res:Response)=>{
    const allData  = await getAllUsers();
    res.status(200).json({data:allData});
}

const single = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const intId = parseInt(id);
    const user = await getSingleUser(intId);
    res.status(200).json({user});
}

const updateData = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const intId = parseInt(id);
  const updated= await updateSingleUser(intId,req.body);
  res.status(200).json({status:'sucess',updated})
}

const deleteData = async(req:Request,res:Response)=>{
    const {id} = req.params;
    const intId = parseInt(id);
  const deleted= await deleteUser(intId);
  res.status(200).json({status:'success',deleted})
}

const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  try {
  let user = await prisma.user.findFirst({where: {email}})
  if (!user) {
      throw Error('user does not exists')
  }
  if (!compareSync(password, user.password)) {
      throw Error('incorrect password')
  }
  const token = jwt.sign(
    { userId: user.user_id }, 
JWT_SECRET,
  { expiresIn: '1d'});
const refreshToken = jwt.sign(
  { userId: user.user_id },
 JWT_SECRET,
 { expiresIn: '1d' }
);

res.json({ user: { userId: user.user_id, email: user.email }, token, refreshToken });
} catch (error) {
  console.error('Error during login:', error);
  res.status(500).json({ message: 'Internal server error' });
}
}

const logout = async (req: Request, res: Response) => {
res.clearCookie('jwtToken'); 
res.status(200).json({ message: 'Logged out successfully' });
};


  export 
  { createUserController,
  getData,
  single,
  updateData,
  deleteData,
  login,
  logout
  }