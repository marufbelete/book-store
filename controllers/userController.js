import User from '../models/user.js'
import bcrypt from 'bcrypt'
import {generateToken,removeRefreshToken,saveRefershToken} from '../helpers/manageToken.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Email and password are required');
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('username or password is invalid');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Incorrect username or password');
    }
    const payload={username:user.username,sub:user._id}
    const token=generateToken(payload)
    const user_info=await saveRefershToken(user._id,token.refresh_token)
    res.cookie('access_token',token.access_token)
    res.cookie('refresh_token',token.refresh_token)
    return res.status(200).json({ user: user_info,success: true});

  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
    return res.status(400)
    .send('User with this username already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({username, password: hashedPassword });
    await user.save();
    res.status(201).send("Customer successfully registered, now you can login");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const logout=async(req,res,next)=>{
  try {
    const userId=req?.user?.sub
    if(userId)
    await removeRefreshToken(userId)
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    return res.status(201).json({message:"user Loged-out successfully",status:true})
  } catch (error) {
    return res.status(500).json({message:"Internal server error",
    error:error.message,});
  }
}
