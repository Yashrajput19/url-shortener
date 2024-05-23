import express from 'express';
import { handleUserSignup , handleUserLogin} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/',handleUserSignup);
userRouter.post('/login',handleUserLogin);

export default userRouter;