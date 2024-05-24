import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../utils/auth.js";

export async function handleUserSignup(req,res){
    
    const {name , email , password} = req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect('/login');
}

export async function handleUserLogin(req,res){
    
    const { email , password} = req.body;
    const user = await User.findOne({ email , password});
    
    if(!user) return res.render('login' , {
        error: "Invalid Username or Password",
    });

    const token = setUser(user);
    res.cookie('uid',token);
    return res.redirect('/');
}