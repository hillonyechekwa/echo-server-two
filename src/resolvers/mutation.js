import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";
import dotenv from 'dotenv'
import mongoose from 'mongoose' //for object types
dotenv.config()


export default {
    signUp: async (parent, {username, email, password}, {models}) => {
        var email = email.trim().toLowerCase()

        var saltRounds = 10;

        let passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if(!passwordPattern.test(password)){
            throw new Error("Password Doesn't meet criteria")
        }

        var encryptedPassword = await bcrypt.hash(password, saltRounds);

        try{
            const user = await models.User.create({
                    username,
                    email,
                    password: encryptedPassword
            })
            return jwt.sign({id: user._id}, process.env.JWT_SECRET)
        }catch(error){
            console.error(error);
            throw new Error("error creating account");
        }

    },
    signIn: async (parent, {username, email, password}, {models}) => {
        if(email){
            var email = email.trim().toLowerCase()
        }

        const user = await models.User.findOne({
            $or: [{email}, {username}]
        })

        if(!user){
            throw new GraphQLError('Error signing in')
        }


        const valid = await bcrypt.compare(password, user.password);

        if(!valid){
            throw new GraphQLError('Error Signing in')
        }


        return jwt.sign({id: user._id}, process.env.JWT_SECRET)
        
    },
    newChat: async(parent, {participantId}, {models, user}) => {
        //user check?
        if(!user){
            throw new GraphQLError("you need to be signedin to carry out this action!")
        }

        let participant = models.User.findById(participantId)

        return await models.Chat.create({
            user: user.id,
            participant
        })
    }
}