import bcrypt from "bcryptjs";
import User from "../models/User.js";

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
        await newUser.save();
        return res.json({newUser, message: "OK"})

    } catch (error) {
        return res.json({message: "Error while creating user"})
    }

}

//Login

export const login = () => {}

//getMe

export const getMe = () => {}