import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import path, {dirname} from 'path';
import { fileURLToPath } from "url";

//Register
export const register = async(req, res) => {
    try {
        if(!req.body) return res.json({message: "Registration error."});
        const username = req.body.name;
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const isUsed = await User.findOne({name: username});
        if(isUsed) return res.json({message: "This user is already used"}); 

        
        const newUser = new User({name: username, password: hash});
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        );
        
        await newUser.save();
        return res.json({newUser, token, message: "OK"})

    } catch (error) {
        return res.json({message: "Error while creating user"})
    }

}

//Login

export const login = async(req, res) => {
    try {
        const {name, password} = req.body;
        
        //check user exist
        const user = await User.findOne({name});
        if(!user) return res.json({message: "No such a user"});

        //check password correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.send({message: "Incorrect password"});

        //check are we login already? if we are not in system we haven't got token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})
        return res.json({token, user, message: "You are successfully login"})

    } catch (error) {
        return res.send({message: "No access"})
    }
}

//getMe обрабатывает обновление страницы

export const getMe = async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) return res.json({message: "No such a user"});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        return res.json({user, token})
    } catch (error) {
        return res.send({message: "No access"})
    }
}