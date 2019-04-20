const { check, body, param } = require('express-validator/check');

exports.validate = (method) => {
    //console.log(`scores.validator validate method`);
    switch (method) {
        case 'create': {
            return [
                body('id', 'id does not exist').exists(),
                body('name', 'name does not exist').exists(),
                body('team', 'team does not exist').exists(),
                body('scores', 'scores do not exist').exists(),
                check('scores').isArray().withMessage( 'scores array must be present'),
                check('scores').custom((scores)=> scores.length === 4).withMessage( '4 scores must be present')
            ];
        }
        case 'delete': {
            return [
                check('id', 'parameter id must be integer').isInt(),
            ];
        }
        case 'update': {
            return [
                check('id', 'parameter id must be integer').isInt(),
                body('id', 'id does not exist').exists(),
                body('name', 'name does not exist').exists(),
                body('team', 'team does not exist').exists(),
                body('scores', 'scores do not exist').exists(),
                check('scores').isArray().withMessage( 'scores array must be present'),
                check('scores').custom((scores)=> scores.length === 4).withMessage( '4 scores must be present')
            ];
        }
    }
};