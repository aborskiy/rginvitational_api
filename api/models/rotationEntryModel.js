import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    id: { type: String, required: true, enum: ['floor', 'rope', 'hoop', 'ribbon'] },
    diff: { type: Number, required: true },
    exec: { type: Number, required: true },
    deduct: { type: Number, required: true },
    total: { type: Number, required: true }
});

const ApparatusSchema = new Schema(
    {
        id: { type: String, required: true, enum: ['floor', 'rope', 'hoop', 'ribbon'] },
        imageurl: { type: String, required: true, enum: ['images/floor-min-2.png', 'images/rope-min-2.png', 'images/hoop-min-2.png', 'images/ribbon-min-2.png'] }
    }, 
    {_id: false});

const RotationEntrySchema = new Schema({
    participantId: { type: Number, ref: 'participants', required: true },
    name: { type: String, required: true },
    team: { type: String, required: true },
    apparatus: ApparatusSchema,
    score: ScoreSchema,
    updated: { type: Date, default: Date.now }
});

RotationEntrySchema.plugin(AutoIncrement, { inc_field: 'rotaId' });

//module.exports = mongoose.model('rotationentries', RotationEntrySchema);
export default mongoose.model('rotationentries', RotationEntrySchema);