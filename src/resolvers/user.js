export default {
    chats: async(user, args, {models}) => {
        return await models.Chat.find({
            $or: [{user: user._id}.sort({_id: -1}), {participant: user._id}.sort({_id: -1})]
        })
    },
    contacts: async(user, args, {models}) => {
        return await models.Contact.find({user: user._id}.sort({_di: -1}))
    }
}