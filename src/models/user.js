import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true,
            index: { unique: true }
        },
        avatar: {
            type: String
        },
        bio: {
            type: String
        },
        onlineStatus: {
            type: String,
            enum: ['ONLINE', 'OFFLINE']
        },
        chats: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat"
            }
        ],
        contacts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Contact"
            }
        ]
    },
    {
        timestamps: true
    }
)


const User = mongoose.model('User', userSchema)
export default User