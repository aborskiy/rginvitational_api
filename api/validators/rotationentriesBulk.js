const { check, body, header, param } = require('express-validator/check');

exports.validate = (method) => {
    
    //console.log(`rotationentries.validator validate method`);
    switch (method) {
        case 'create': {
            //console.log(`rotationBulk validator header: ${header('X-Action')} body: ${body()}`);
            return [
                header('X-Action').isIn(['bulk']).withMessage('invalid value in X-Action header'),
                body().isArray().withMessage('array of rotatoin entries not present'),
                body('*.rotaId', 'rotaId must be an integer').exists().isInt(),
                body('*.participantId', 'participant must be an integer').exists().isInt(),
                body('*.name', 'name must be a String').exists().isString(),
                body('*.team', 'team must be a String').exists().isString(),
                body('*.apparatus', 'apparatus must be a String').exists(),
                body('*.score', 'score does not exist').exists()
                //check('*.apparatus.id').isIn(['floor', 'hoop', 'rope', 'ribbon']).withMessage('apparatus id is invalid, should be floor, hoop, rope, ribbon'),
                //check('*.score.id').isIn(['floor', 'hoop', 'rope', 'ribbon']).withMessage('score id is invalid, should be floor, hoop, rope, ribbon')
            ];
        }
        case 'delete': {
            return [
                header('X-Action').isIn(['bulk']).withMessage('invalid value in X-Action header')
            ];
        }

    }
};