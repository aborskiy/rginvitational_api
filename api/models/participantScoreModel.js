import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    id: {type: String, required: true, enum: ['floor', 'rope', 'hoop', 'ribbon']},
    diff: {type: Number, required: true},
    exec: {type: Number, required: true},
    deduct: {type: Number, required: true},
    total: {type: Number, required: true}
});

const ParticipantScoreSchema = new Schema({
    id: {type: Number, ref: 'participants', required: true},
    name: {type: String, required: true},
    team: { type: String, required: true },
    scores:[
        ScoreSchema
    ],
    total: {type: Number, required: true},
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('scores', ParticipantScoreSchema);