import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');

var mongoose = require('mongoose'), rotationsession = require('../models/rotationSessionModel'),
    model = mongoose.model('rotationsession');

exports.readAll = asyncHandler(async (req, res) => {
    const rotationsession = await model.find();
    return res.status(200).json(rotationsession);
});

exports.create = asyncHandler(async (req, res, next) => {
    console.log(`rotationsession.controller.create starts`);
    try {
        await model.create(req.body, (err, rotationSession) => {
            if (err) {
                console.log(`rotationsession.controller.post err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            return res.status(201).json(rotationSession);
        });

    }
    catch (error) {
        handleError(res, error.message);
    }
}
);

exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(`rotationsession.controller.update by id: ${req.params.id} `);
        const participant = await model.findOneAndUpdate({ _id: req.params.id }, req.body, (err, rotationSession) => {
            if (err) {
                console.log(`rotationsession.controller.update by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!rotationSession) {
                console.log(`rotationsession.controller.update by id rotationSession not found - returning 404`);
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
        console.log(`rotationsession.controller.delete by id: ${req.params.id} `);
        let deleted;
        await model.findOneAndDelete({ _id: req.params.id }, (err, rotationSession) => {
            if (err) {
                console.log(`rotationsession.controller.delete by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!rotationSession) {
                console.log(`rotationsession.controller.delete by id participant not found - returning 404`);
                return res.sendStatus(404);
            }
            deleted = rotationSession;
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
    console.log(`rotationsession controller.handleError`);
    return res.status(500).json(err);
};
