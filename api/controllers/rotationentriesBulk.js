import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');

var mongoose = require('mongoose'), rotationentries = require('../models/rotationEntryModel'),
    model = mongoose.model('rotationentries');


exports.create = asyncHandler(async (req, res, next) => {
    //console.log(`rotationentries.controller.create starts`);
    try {
        await model.insertMany(req.body, (err, rotationEntries) => {
            if (err) {
                console.log(`rotationentries.controller.post err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            return res.status(201).json(rotationEntries);
        });

    }
    catch (error) {
        handleError(res, error.message);
    }
}
);

exports.delete = asyncHandler(async (req, res) => {
    try {
        console.log(`rotationentries.controller.delete bulk `);
        let deleted;
        await model.deleteMany((err) => {
            console.log(`delete many callback function err: ${err}`);
        });
        console.log(`rotationentries.controller.delete bulk before returning status 200 `);
        return res.status(200).send(`all rotationentries deleted successfully`);
    }
    catch (error) {
        handleError(res, error.message);
    }
});

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
    console.log(`rotationentriesBulk controller.handleError`);
    return res.status(500).json(err);
};

export default this;
