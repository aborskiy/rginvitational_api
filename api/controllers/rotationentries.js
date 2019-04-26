import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');

var mongoose = require('mongoose'), rotationentries = require('../models/rotationEntryModel'),
    model = mongoose.model('rotationentries');

exports.readAll = asyncHandler(async (req, res) => {
    const rotationentries = await model.find();
    return res.status(200).json(rotationentries);
});

exports.create = asyncHandler(async (req, res, next) => {
    console.log(`rotationentries.controller.create starts`);
    try {
        await model.create(req.body, (err, rotationEntry) => {
            if (err) {
                console.log(`rotationentries.controller.post err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            return res.status(201).json(rotationEntry);
        });

    }
    catch (error) {
        handleError(res, error.message);
    }
}
);

exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(`rotationentries.controller.update by id: ${req.params.id} `);
        const participant = await model.findOneAndUpdate({ rotaId: req.params.id }, req.body, (err, rotationEntry) => {
            if (err) {
                console.log(`rotationentries.controller.update by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!rotationEntry) {
                console.log(`rotationentries.controller.update by id rotationEntry not found - returning 404`);
                return res.sendStatus(404);
            }

        }
        );

        return res.status(200).json(participant);
    }
    catch (error) {
        handleError(res, error.message);
    }

});

exports.delete = asyncHandler(async (req, res) => {
    try {
        console.log(`rotationentries.controller.delete by id: ${req.params.id} `);
        let deleted;
        await model.findOneAndDelete({ rotaId: req.params.id }, (err, rotationEntry) => {
            if (err) {
                console.log(`rotationentries.controller.delete by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!rotationEntry) {
                console.log(`rotationentries.controller.delete by id participant not found - returning 404`);
                return res.sendStatus(404);
            }
            deleted = rotationEntry;
        }
        );

        return res.status(200).json(deleted);
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
    console.log(`rotationentries controller.handleError`);
    return res.status(500).json(err);
};

export default this;