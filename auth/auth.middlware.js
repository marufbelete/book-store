import jwt from 'jsonwebtoken';
import {verifyToken, removeRefreshToken,
saveRefershToken,generateToken,isRefreshTokenExist } from '../helpers/manageToken.js';
const Auth=async(req, res, next) =>{
    const {access_token,refresh_token} = req.cookies;
    try {
    if (!access_token) {
        return res.status(401).json({
            message: 'Unauthorized user please try again'
        })
    }
        const {username,sub}=verifyToken(access_token,process.env.ACCESS_TOKEN_SECRET)
        if(!(await isRefreshTokenExist(refresh_token,sub)))
        return res.status(401).send("token compromised alert, please login again.");
        req.user = {username,sub}
        next()
    } catch (a_error) {
        if (a_error instanceof jwt.TokenExpiredError) {
            try{
                const {username,sub}=verifyToken(refresh_token,process.env.REFRESH_TOKEN_SECRET)
                if(!(await isRefreshTokenExist(refresh_token,sub)))
                {
                    await removeRefreshToken(sub)
                    return res.status(401).send("Access denied, please login.");
                }
                const token=generateToken({username,sub})
                await saveRefershToken(sub,token.refresh_token)
                res.cookie('access_token',token.access_token)
                res.cookie('refresh_token',token.refresh_token)
                req.user = {username,sub}
                next() 
                return
            }
    //refresh hoken handle
    catch(r_error){
        if (r_error instanceof jwt.TokenExpiredError) {
       return res.status(401).send("Invalid access token and refresh token.");
        }
        return res.status(500).json({
            message: 'Internal server Error',
            error: r_error.message,
        });
      }
}
    //access token 
        if (a_error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Invalid access token',
                error: a_error.message,
            })
        }
        return res.status(500).json({
            message: 'Internal server Error',
            error: a_error.message,
        });
    }
}
export default Auth