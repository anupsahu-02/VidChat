import { User } from "../models/user.js";
import httpStatus from "http-status";

import bcrypt, {hash} from 'bcrypt';
import crypto from 'crypto';
import { Meeting } from "../models/meeting.js";

const login = async(req, res) => {
    try {
        let {username , password} = req.body;
        if(!username || !password) {
            return res.status(400).json({message : "Provide all informations"});
        }

        let user = await User.findOne({username});
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).json({message : "User not found"})
        }

        let isPassCorrect = await bcrypt.compare(password, user.password);
        if(isPassCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token : token});
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid Username or Password"});
        }
    } catch (e) {
        return res.status(500).json({message : `something went wrong ${e}`});
    }
}

const register = async(req, res) => {
    let {name, username, password} = req.body;
    try {

      if (!username || !password || !name) {
        return res.status(400).json({ message: "Provide all informations" });
      }

        let existingUser = await User.findOne({username}); 
        if(existingUser) {
            return res.status(httpStatus.FOUND).json({message : "User already exists"});
        }

        const hashedPass = await bcrypt.hash(password, 10); 
        const newUser = new User({
            name : name,
            username : username,
            password : hashedPass,
        })
        
        await newUser.save();

        return res.status(httpStatus.CREATED).json({message : "User Registered"});
    }
    catch(e) {
        return res.json({message : `something went wrong ${e}`});
    }
}

const getUserHistory = async (req, res) => {
   const {token} = req.query;
   try {
      let user = await User.findOne({ token });
      let meetings = await Meeting.find({ user_id: user.username});
      res.json(meetings);
      
   } catch (e) {
      res.json({message : `somthign went wrong ${e}`})
   }
}

const addToHistory = async(req, res) => {
   let {token, meeting_code} = req.body;

   try {
      let user = await User.findOne({ token });

      let newMeeting  = new Meeting({
         user_id : user.username,
         meeting_code : meeting_code,
      })

      await newMeeting.save();

      res.status(httpStatus.CREATED).json({message : "meeting saved in history"});
   } catch (e) {
      res.json({message : `somthign went wrong ${e}`});
   }
}

const isValidToken = async(req, res) => {
   let {token} = req.query;

   try {
      let user = await User.findOne({token});

      if(user) {
         return res.status(httpStatus.FOUND).json({message : "User exists"});
      } 
      return res.status(httpStatus.NOT_FOUND).json({message : "Not Found"});
   } catch(e) {
      return res.json({message : `somthing went wrong ${e}`});
   }
}

export {login , register, addToHistory, getUserHistory, isValidToken};