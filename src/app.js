import express from 'express';
import {createYoga, createSchema} from "graphql-yoga"
import {resolvers} from './resolvers'
import fs from 'fs'
import path from 'path'


const schemaPath = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaPath, 'utf8')

export function buildApp(app){
    const graphqlServer = createYoga({
        schema: createSchema({
            typeDefs,
            resolvers
        }),
        logging: false
    })
    app.use(graphqlServer.graphqlEndpoint, graphqlServer);

    return graphqlServer.graphqlEndpoint
}