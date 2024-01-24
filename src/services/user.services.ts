import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient()
import  {hashSync, compareSync} from 'bcrypt';



interface typeBody {
user_name: string,
password: string,
email: string 
}

const signup = async (user_name: string, password: string, email: string ) => {
    const createdUser = await prisma.user.create({
        data:{
            user_name,
            password: hashSync(password, 10),
            email
        }
    })
    return createdUser
    }
   
    
const getAllUsers = async()=>{
    const allData = await prisma.user.findMany();
    return allData;
}

const getSingleUser = async(singleId:number)=>{
const singleUser = await prisma.user.findUnique({
    where:{user_id:singleId}
});
return singleUser;
}
const updateSingleUser = async(singleId:number,body:typeBody)=>{
 const updatedData = await prisma.user.update({
    where:{user_id:singleId},
    data:body
 });
 return updatedData;
}

const deleteUser = async(singleId:number)=>{
    const deleted = await prisma.user.delete({
        where:{user_id:singleId}
    });
    return deleteUser;
}

export {
    signup,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser
};