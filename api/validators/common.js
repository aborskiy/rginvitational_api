import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');


exports.printRequest = asyncHandler(async (req, res, next) => {
    await console.log(`common printRequest starts`);
    await console.log(`req.headers: ${req.headers}`);
    await console.log(`req.header['X-Action']: ${req.header['X-Action']}`);
    await console.log(`req.headers['X-Action']: ${req.headers['X-Action']}`);
    await console.log(`req.body: ${JSON.stringify(req.body)}`);
    next();
}
);

exports.checkValidationResults = asyncHandler(async (req, res, next) => {
    console.log(`common checkValidationResults starts`);
    try {
        const errors = await validationResult(req);
        console.log(`errors: ${errors}`);
        if (!errors.isEmpty()) {
            console.log(`errors not empty!!!`);
            return res.status(422).json(errors.array());
        }
        next();
    }
    catch (error) {
        handleError(res, error.message);
    }
}
);


/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
    console.log(`validators common.handleError`);
    return res.status(500).json(err);
};
