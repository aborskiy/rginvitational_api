const { check, body, header, param } = require('express-validator/check');

exports.validate = (method) => {
    //console.log(`rotationentries.validator validate method`);
    switch (method) {
        case 'create': {
            return [
                header('X-Action').isIn([undefined, 'bulk']).withMessage('invalid value in X-Action header'),
                body('rotaId', 'rotaId does not exist').exists(),
                body('participantId', 'participant id does not exist').exists(),
                body('name', 'name does not exist').exists(),
                body('team', 'team does not exist').exists(),
                body('apparatus', 'apparatus does not exist').exists(),
                body('score', 'score does not exist').exists(),
                check('apparatus.id').isIn(['floor', 'hoop', 'rope', 'ribbon']).withMessage('apparatus id is invalid, should be floor, hoop, rope, ribbon'),
                check('score.id').isIn(['floor', 'hoop', 'rope', 'ribbon']).withMessage('score id is invalid, should be floor, hoop, rope, ribbon')
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
                body('rotaId', 'rotaId does not exist').exists(),
                body('participantId', 'participant id does not exist').exists(),
                body('name', 'name does not exist').exists(),
                body('team', 'team does not exist').exists(),
                body('apparatus', 'apparatus does not exist').exists(),
                body('score', 'score does not exist').exists(),
                check('apparatus.id').isIn(['floor', 'hoop', 'rope', 'ribbon']).withMessage('apparatus id is invalid, should be floor, hoop, rope, ribbon'),
                check('score.id').isIn(['floor', 'hoop', 'rope', 'ribbon']).withMessage('score id is invalid, should be floor, hoop, rope, ribbon')
            ];
        }
    }
};