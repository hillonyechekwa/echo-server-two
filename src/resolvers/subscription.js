export default  {
    newMessage: {
        subscribe: async(parent, {chatId}, {models, user, pipe, filter}) => pipe(
            await context.pubSub.subscribe(`newMessage_${chatId}`),
            filter(publishedMessage => {
                return models.Chat.find({_id: publishedMessage.chatId}) //where the some of the participants is the id: user.id
            })
        ) ,
        resolve: payload => payload
    }
}