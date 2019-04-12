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
    //const validationResults = await validationResult(req);
    //console.log(`validationResults: ${validationResults}`);
    try {
        const errors = await validationResult(req);
        console.log(`errors: ${errors}`);
        if (!errors.isEmpty()) {
            console.log(`errors not empty!!!`);
            return res.status(422).json(errors.array());
        }
        //req.getValidationResult()
        //.then(validationHandler())

        console.log(`participants.controller.create before model.create`);
        const participant = await model.create(req.body, (err, participant) => {
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



const validationHandler = next => result => {
    const methodName = `participants.controller.validatorHandler`;
    console.log(`${methodName} starts`);
    if (result.isEmpty()) return;
    console.log(`${methodName} result is not empty, result.length ${result.array()}`);
    if (!next) {
        console.log(`${methodName} !next`);
        throw new Error(
            result.array().map(i => `'${i.param}' has ${i.msg}`).join(' ')
        );
    }
    else {
        console.log(`${methodName} next`);
        return next(
            new Error(
                result.array().map(i => `'${i.param}' has ${i.msg}`).join('')
            )
        );
    }
};


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