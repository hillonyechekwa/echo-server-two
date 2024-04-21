export default {
    user: async(contact, args, {models}) => {
        return await models.User.find(contact.user)
    },
    contact: async(contact, args, {models}) => {
        return await models.User.find(contact.contact)
    }
}