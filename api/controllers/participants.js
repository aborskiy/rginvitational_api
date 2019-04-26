import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');

var mongoose = require('mongoose'),
    model = mongoose.model('participants');

exports.readAll = asyncHandler(async (req, res) => {
    const participants = await model.find();
    return res.status(200).json(participants);
});

exports.readById = asyncHandler(async (req, res) => {
    try {
        console.log(`participants.controller.get by id`);
        const participant = await model.findOne({ id: req.params.id }, (err, participant) => {
            if (err) {
                console.log(`participants.controller.get by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!participant) {
                console.log(`participants.controller.get by id participant not found - returning 404`);
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

exports.create = asyncHandler(async (req, res, next) => {
    console.log(`participants.controller.create starts`);
    try {
        console.log(`participants.controller.create before model.create`);
        await model.create(req.body, (err, participant) => {
            if (err) {
                console.log(`participants.controller.post err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            return res.status(201).json(participant);
        });

    }
    catch (error) {
        handleError(res, error.message);
    }
}
);

exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(`participants.controller.update by id: ${req.params.id} `);
        const participant = await model.findOneAndUpdate({ id: req.params.id }, req.body, (err, participant) => {
            if (err) {
                console.log(`participants.controller.update by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!participant) {
                console.log(`participants.controller.update by id participant not found - returning 404`);
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
        console.log(`participants.controller.delete by id: ${req.params.id} `);
        let deleted;
        await model.findOneAndDelete({ id: req.params.id }, (err, participant) => {
            if (err) {
                console.log(`participants.controller.delete by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!participant) {
                console.log(`participants.controller.delete by id participant not found - returning 404`);
                return res.sendStatus(404);
            }
            deleted = participant;
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
    console.log(`participant controller.handleError`);
    return res.status(500).json(err);
};

export default this;