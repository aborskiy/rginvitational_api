import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//const Base = require('../baseSchema'); // we have to make sure this schema is aware of the Base schema

//const ParticipantInfoSchema = Base.discriminator('participants', new Schema({
const ParticipantInfoSchema = new Schema({    
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    team: { type: String, required: true },
    updated: { type: Date, default: Date.now },
    //timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Duplicate the ID field.
//ParticipantInfoSchema.virtual('appId').get(() => {
//    return this._id.toHexString();
//});

// Ensure virtual fields are serialised.
//ParticipantInfoSchema.set('toJSON', {
//    virtuals: true
//});

export default mongoose.model('participants', ParticipantInfoSchema);
//export default ParticipantInfoSchema;
