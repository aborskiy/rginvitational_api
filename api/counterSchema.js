import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 10 }
});

export default mongoose.model('counter', CounterSchema);