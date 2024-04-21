export default {
    sender: async (message, args, {models}) => {
        return await models.User.findById(message.sender)
    },
    chat: async (message, args, {models}) => {
        return await models.Chat.findById(message.chat)
    }
}