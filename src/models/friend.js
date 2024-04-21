import mongoose from 'mongoose';

const friendSchema = mongoose.Schema(
    {
        userOne: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userTwo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String
        }
    }
)


const Friend = mongoose.model('Friend', friendSchema)

export default Friend