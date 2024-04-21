
import Query from "./query"
import Mutation from "./mutation"
import Subscription from "./subscription"
import { DateTimeResolver } from "graphql-scalars"

export const resolvers = {
    Query,
    Mutation,
    Subscription,
    DateTime: DateTimeResolver
}