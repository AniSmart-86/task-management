import express from 'express';
import { getProfile, LoginUser, RegisterUser} from '../controller/userController.js';
import authUser from '../middleWare/authMiddleWare.js';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/taskController.js';



const userRoute = express.Router();


userRoute.post('/register',RegisterUser)
userRoute.post('/login',LoginUser)
userRoute.get('/get-profile', authUser, getProfile)
// userRoute.post('/update',updateProfile)

// Task Routes
userRoute.post('/create', createTask)
userRoute.get('/get-alltask', getAllTasks)
userRoute.get('/get-task/:id', getTaskById)
userRoute.put('/update/:id', updateTask)
userRoute.delete('/delete/:id', deleteTask)



export default userRoute