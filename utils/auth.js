import jwt from "jsonwebtoken";

export function setUser( user)
{
    return jwt.sign({
        
        _id: user._id,
        email: user.email,
        role: user.role,

    },process.env.JWT_SECRET_KEY)
}

export function getUser(token)
{
    if(!token) return null;

    try {
        return jwt.verify(token,process.env.JWT_SECRET_KEY); 
    } catch (error) {
        return null;
    }

}

