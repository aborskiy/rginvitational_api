import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');

var mongoose = require('mongoose'),
    model = mongoose.model('scores');

exports.readAll = asyncHandler(async (req, res) => {
    const scores = await model.find();
    return res.status(200).json(scores);
});

exports.create = asyncHandler(async (req, res, next) => {
    console.log(`scores.controller.create starts`);
    try {
        await model.create(req.body, (err, score) => {
            if (err) {
                console.log(`scores.controller.post err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            return res.status(201).json(score);
        });

    }
    catch (error) {
        handleError(res, error.message);
    }
}
);

exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(`scores.controller.update by id: ${req.params.id} `);
        const participant = await model.findOneAndUpdate({ id: req.params.id }, req.body, (err, score) => {
            if (err) {
                console.log(`scores.controller.update by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!score) {
                console.log(`scores.controller.update by id score not found - returning 404`);
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
        console.log(`scores.controller.delete by id: ${req.params.id} `);
        let deleted;
        await model.findOneAndDelete({ id: req.params.id }, (err, score) => {
            if (err) {
                console.log(`scores.controller.delete by id err: ${err} err.message: ${err.message}`);
                handleError(err, err.message);
            }
            if (!score) {
                console.log(`scores.controller.delete by id participant not found - returning 404`);
                return res.sendStatus(404);
            }
            deleted = score;
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
    console.log(`scores controller.handleError`);
    return res.status(500).json(err);
};

export default this;


