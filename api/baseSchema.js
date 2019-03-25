import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: 'id',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    //updated: { type: Date, default: Date.now }
};

const Base = new Schema({}, baseOptions);

// Duplicate the ID field.
Base.virtual('id').get(() => {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
Base.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Base', Base);

// Our Base schema: these properties will be shared with our "real" schemas
//const Base = mongoose.model('Base', new Schema({}, baseOptions));
