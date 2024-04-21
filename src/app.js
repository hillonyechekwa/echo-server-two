import {createYoga, createSchema, createPubSub, pipe, filter} from "graphql-yoga"
// import {PrismaClient} from "@prisma/client";
import {models} from "./models"
import db from "./db"
import { jwt } from 'jsonwebtoken';
import {resolvers} from './resolvers'
import typeDefs from "./schema"
import dotenv from 'dotenv';
dotenv.config()


// const prisma = new PrismaClient()

const DB_HOST = process.env.DATABASE_URL


const pubSub = createPubSub()

const getUserToken = (token) => {
    if(token){
        try{
            return jwt.verify(token, process.env.JWT_SECRET)
        }catch(error) {
            throw new Error('session Invalid')
        }
    }
}


export function buildApp(app){
    const graphqlServer = createYoga({
        schema: createSchema({
            typeDefs,
            resolvers
        }),
        context({req}){
            const token = req.headers.authorization
            const user = getUserToken(token)
            return {models, user, pubSub, pipe, filter}
        },
        logging: false
    })
    app.use(graphqlServer.graphqlEndpoint, graphqlServer);
    db.connect(DB_HOST)
    return graphqlServer.graphqlEndpoint
}