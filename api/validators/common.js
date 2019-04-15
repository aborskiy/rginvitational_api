import asyncHandler from 'express-async-handler';
const { validationResult } = require('express-validator/check');

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
