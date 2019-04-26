import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RotationSessionSchema = new Schema({
    onFloorParticipantId: {type: Number, required: true},
    scoreParticipantId: {type: Number, required: true},
    updated: { type: Date, default: Date.now }
});

// module.exports = mongoose.model('rotationsession', RotationSessionSchema);

export default mongoose.model('rotationsession', RotationSessionSchema);