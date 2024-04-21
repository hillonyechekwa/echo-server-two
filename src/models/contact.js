import mongoose from 'mongoose'

const contactSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        contact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'BLOCKED'],
            default: 'PENDING'
        }
    }
)


const Contact = mongoose.model('Contact', contactSchema)
export default Contact