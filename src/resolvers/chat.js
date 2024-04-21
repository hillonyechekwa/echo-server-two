export default {
    user: async (chat, args, {models}) => {
        return await models.User.findById(chat.user)
    },
    participant: async(chat, args, {models}) => {
        return await models.User.findById(chat.participant)
    },
    messages: async(chat, args, {models}) => {
        return await models.Message.find({chat: chat._id}).sort({_id: -1})
    }
}