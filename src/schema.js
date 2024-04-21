import {gql} from 'graphql-tag';

const typeDefs = gql`
    scalar DateTime

    type User {
        id: ID!
        username: String
        email: String
        password: String
        avatar: String
        bio: String
        onlineStatus: USER_STATUS
        chats: [Chat],
        contacts: [Contact]
        createdAt: DateTime!
    }

    type Message{
        id: ID!
        content: String!
        sender: User!
        mediaType: String!
        status: MESSAGE_STATUS
        chat: Chat!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    input MessageInput{
        content: ID!
        sender: User!
        chatId: Chat!
        status: MESSAGE_STATUS
        mediaType: String!
    }

    type Chat{
        id: ID!
        user: User!
        participant: User!
        messages: [Message]
        createdAt: DateTime!
        updatedAt: DateTime
    }

    type Contact{
        user: User!
        contact: User!
        status: CONTACT_STATUS 
    }


    enum USER_STATUS{
        ONLINE
        OFFLINE
    }

    enum MESSAGE_STATUS{
        FAILED
        SENT
        RECEIVED
        READ
    }

    enum CONTACT_STATUS{
        PENDING
        ACCEPTED
        BLOCKED
    }


    type Query{
        contacts: [Contact!]!
        #contact(id: !ID, name: String!): Contact!
        #chats: [Chat!] @isParticipant(if: Boolean!)
        users: [User!]!
        user(username: String!): User!
        me: User!
    }

    type Mutation{
        signUp(email: String!, password: String!): String!
        signIn(email: String, password: String): String!
        newChat(participantId: !ID): Chat!
        sendMessage(details: MessageInput!): Message!
        deleteMessage(messageId: ID!): Boolean!
        editMessage(messageId: ID!, content: String!): Message!
        #updateProfile
        #addContact
        #removeContact
        #blockContact
    }

    type Subscription{
        newMessage(chatId: ID!): Message!
    }
`


export default typeDefs