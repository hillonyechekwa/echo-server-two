import mongoose from 'mongoose';


export default {
    connect: DB_HOST => {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true)
        mongoose.set('useUnifiedTopology', true)
        mongoose.connect(DB_HOST);
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log('MonogoDB connection error. Please make sure MongoDB is running')
            process.exit();
        })
    },
    close: () => {
        mongoose.connection.close();
    }
}