const { check, body, param } = require('express-validator/check');

exports.validate = (method) => {
    //console.log(`rotationsession.validator validate method`);
    switch (method) {
        case 'create': {
            return [
                body('onFloorParticipantId', 'onFloorParticipantId does not exist').exists(),
                body('scoreParticipantId', 'scoreParticipantId does not exist').exists(),
                body('onFloorParticipantId', 'onFloorParticipantId must be integer').isInt(),
                body('scoreParticipantId', 'scoreParticipantId must be integer').isInt(),

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
                body('onFloorParticipantId', 'onFloorParticipantId does not exist').exists(),
                body('scoreParticipantId', 'scoreParticipantId does not exist').exists(),
                body('onFloorParticipantId', 'onFloorParticipantId must be integer').isInt(),
                body('scoreParticipantId', 'scoreParticipantId must be integer').isInt(),

            ];
        }
    }
};