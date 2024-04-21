export default {
    contacts: async(parent, args, {models}) => {
        return await models.Contact.find({})
    },
    // contact: async(parent, args, {username}, {models, user}) => {
    //     //use derivative to check if person searching is a user in the contact
    //     //connect username to contact deeper details
    // },
    // chats: async(parent, args, {models, user}) => {
    //     //use directive for rbac check
    // },
    users: async(parent, args, {models}) => {
        return await models.User.find({})
    },
    user: async(parent, {username}, {models}) => {
        return await models.User.findOne({username})
    },
    me: async(parent, args, {models, user}) => {
        return await models.User.findById(user.id)
    }
}