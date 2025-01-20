import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
    try {
        //primero tomamos la data del POST
        const userData = new User (req.body);

        //Destructuramos y obtenemos solo el mail
        const { email } = userData;

        //Validar que el mail no sea repetido
        const userExist = await User.findOne({ email });

        //Si existe que de un error avisando que ya existe
        if (userExist){
            res.status(400).json({ message: `User with email ${email} already exists` });
        }

        //Si es nuevo lo guardamos
        await userData.save();
        //Mandamos un mensaje tambien
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const get = async (req, res) => {
    try {
        const users = await User.find();

        if (users === 0){
            res.status(204).json({ message: "There are no users" });
        }

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteUser = async (req,res) => {
    try {
        const _id = req.params.id;

        const userExist = await User.findOne({ _id });

        if(!userExist){
            res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(_id)
        res.status(200).json({ message: "User deleted succesfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const update = async (req,res) => {
    try {
        
        const _id = req.params.id;

        const userExist = await User.findOne({ _id });

        if(!userExist){
            res.status(404).json({ message: "User not found" });
        }

        const update = await User.findByIdAndUpdate({_id}, req.body,{
            new: true,
        });

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const login = async (req, res) => {
    try {
        
        const userFound = await User.findOne({ email: req.body.email })

        if(!userFound){
            res.status(404).json({ message: "Email or password is incorrrect" });
        }

        //comparar la password del body contra la db
        if(bcrypt.compareSync(req.body.password, userFound.password)){

            const payload = {
                userId: userFound._id,
                userEmail: userFound.email
            }

            const token = jwt.sign(payload, "secret", {expiresIn: "1h"});

            req.session.token = token;

            res.status(200).json({ message: "Logged In", token });
        } else {
            res.status(404).json({ message: "Email or password is incorrect" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};