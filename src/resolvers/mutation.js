import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";
import dotenv from 'dotenv'
dotenv.config()


export default {
    signUp: async (parent, {email, password}, {prisma}) => {
        var email = email.trim().toLowerCase()

        var saltRounds = 10;

        let passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if(!passwordPattern.test(password)){
            throw new Error("Password Doesn't meet criteria")
        }

        var encryptedPassword = await bcrypt.hash(password, saltRounds);

        try{
            const user = await prisma.user.create({
                data: {
                    email,
                    password: encryptedPassword
                }
            })
            return jwt.sign({_id: user.id}, process.env.JWT_SECRET)
        }catch(error){
            console.error(error);
            throw new Error("error creating account");
        }

    },
    signIn: async (parent, {email, password}, {prisma}) => {
        if(email){
            var email = email.trim().toLowerCase()
        }

        const findUser = await prisma.user.findMany({
            where: {
                    email:{
                        contains: email
                    }
                }
        })

        if(!findUser){
            throw new GraphQLError('Error signing in')
        }

        const hashPassword = findUser.map(user => user.password)

        const userid = findUser.map(user => user.id)


        const matches = await Promise.all(
            hashPassword.map( async (hash) => {
                return bcrypt.compare(password, hash)
            })
        )


        const match = matches.includes(true)


        if(!match){
            throw new GraphQLError('Error signing in!');
        }


        let matchIndex = matches.indexOf(match);


        return jwt.sign({_id: userId[matchIndex]}, process.env.JWT_SECRET)
        
    }
}