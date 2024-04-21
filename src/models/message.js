import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        mediaType: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['FAILED', 'SENT', 'RECEIVED', 'READ'],
            default: "SENT"
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }

    }
)

const Message = mongoose.model('Message', messageSchema)

export default Message