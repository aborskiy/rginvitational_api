import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ParticipantInfoSchema = new Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    team: { type: String, required: true },
    updated: { type: Date, default: Date.now }
});

ParticipantInfoSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('participants', ParticipantInfoSchema);

