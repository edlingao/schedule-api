import Schedule from '../models/Schedule.js'
import User from '../models/User.js'
import { loginValidation, registerValidation } from '../auth/validation.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default class UserController {
    static async find(req, res){
        const _id = req.user
        const user = await User.find({_id})
        res.json(user)
    }
    static async delete(req, res){
        const user = await User.find({_id})
        const _id = req.user
        try{
            const response = await User.deleteOne({_id})
            response.json({
                deleted: true,
                userDeleted: user
            })
        }catch( error ){
            res.status(500).send(error)
        }
    }
    static async logIn(req, res){
        const {email, password} = req.body
        const {error} = loginValidation(req.body)

        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({message: 'Email or password does not match'})
        }
        const validPass = await bcrypt.compare( password, user.password)
        if(!validPass){
            return res.status(400).send({message: 'Email or password does not match'})
        }
        
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        res.header('auth-token', token)
            .send({token})

    }
    static async register(req, res){
        const {email, name, password} = req.body
        const {error} = registerValidation(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt) 
        const user = new User({
            email,
            name,
            password: hashPassword
        })
    
        try{
            const {_id} = await user.save()
            res.send({user: _id})
        }catch(err){
            res.status(400).send(err)
        }
    }
    static async getAllSchedules(req, res){
        const data = await Schedule.find({owner: req.user });
        res.json(data);
    }
}