import  jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const generateToken=(payload)=>{
const access_token=jwt.
sign(payload,process.env.ACCESS_TOKEN_SECRET,
{expiresIn:process.env.ACCESS_TOKEN_EXPIRES})

const refresh_token=jwt.
sign(payload,process.env.REFRESH_TOKEN_SECRET,
{expiresIn:process.env.REFRESH_TOKEN_EXPIRES})

const tokens={access_token,refresh_token}
return tokens

}
export const verifyToken=(token,secret)=>{
const payload=jwt.verify(token,secret)
return payload
}
export const saveRefershToken=async(userId,refreshToken)=>{
    return await User.findByIdAndUpdate(userId,{
        $set:{refreshToken:refreshToken}
    },{new:true})
    
}
export const removeRefreshToken=async(userId)=>{
    return await User.findByIdAndUpdate(userId,{
        $set:{refreshToken:null}
    },{new:true})
     
}
export const isRefreshTokenExist=async(refreshToken,userId)=>{
    const token=await User.findOne({_id:userId,refreshToken:refreshToken})
    return token
}
