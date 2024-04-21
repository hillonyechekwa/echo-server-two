import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";
import dotenv from 'dotenv'
//TODO: don't forget to install aws-s3-sdk
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import mongoose from 'mongoose' //for object types
dotenv.config()



const client = new S3Client({})


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
    },
    sendMessage: async (parent, {details}, {models, user, pubSub}) => {
        //check if is user?
        if(!user){
            throw new GraphQLError("you have to be signed in!")
        }
        

        //TODO: authorize that this user is member of the chat that this message is being sent to

        const {content, sender, chat, status, mediaType} = details

        //create the message
        try{
            const message = models.Message.create({
                content,
                sender,
                chat,
                status,
                mediaType

            })

            //get chat from chatid
            const currentChat = models.Chat.findOne({_id: chat})

            //send chat to message
            await models.Chat.findByIdAndUpdate(
                currentChat.id,
                {
                    $push: {
                        messages: mongoose.Types.ObjectId(message.id)
                    }
                }
            )
            
            //TODO: remove message status feature throughout application

            await pubSub.publish(`newMessage_${chat}`, message)

            return message;

        } catch(error){
            throw new Error("error sending Message")
        }
    },
    uploadImage: async (parent, {file}, {models, user}) => {
        //TODO: do user check?
        
        try{
            await client.send(
                new PutObjectCommand({
                    Bucket: 'test-bucket',
                    key: file.name,
                    Body: Buffer.from(await file.arrayBuffer())
                })
            )
            return true
        } catch(error){
            return false
        }
    },
    uploadAvatar: async (parent, {file}, {models, user}) => {
        //TODO: do user check?
        
        try{
            await client.send(
                new PutObjectCommand({
                    Bucket: 'test-bucket',
                    key: file.name,
                    Body: Buffer.from(await file.arrayBuffer())
                })
            )
            return true
        } catch(error){
            return false
        }
    }
}