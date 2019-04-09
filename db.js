import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import seed from './seed';

dotenv.config();

// Connect to database
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true });
// Connect to database
if (process.env.NODE_ENV === 'test') {
    // use mockgoose for testing
    const mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage().then(() => {
        mongoose.connect(process.env.mongoDB);
    });
} else {
    // use the real deal for everything else
    mongoose.connect(process.env.mongoDB, { useNewUrlParser: true });
}

console.log(`db - after connecting to db`);
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
    console.log('database disconnected');
});
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
    if (process.env.seed){
        seed();
    }
        
});