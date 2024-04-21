export default {
    users: async(parent, args, {prisma}) => {
        return await prisma.user.findMany({})
    },
    user: async(parent, {username}, {prisma}) => {
        return await prisma.user.findUnique({
            where: {
                username: username
            }
        })
    },
    me: async(parent, args, {prisma}) => {
        return await prisma.user.findUnique({where: {id: AudioContext.user.id}})
    }
}