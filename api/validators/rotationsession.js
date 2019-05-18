const { check, body, param } = require('express-validator/check');
let ObjectId = require('mongoose').Types.ObjectId;


exports.validate = (method) => {
    //console.log(`rotationsession.validator validate method`);
    switch (method) {
        case 'create': {
            console.log(`rotationsession.validator validate method create`);
            return [
                body('onFloorParticipantId', 'onFloorParticipantId does not exist').exists(),
                body('scoreParticipantId', 'scoreParticipantId does not exist').exists(),
                body('onFloorParticipantId', 'onFloorParticipantId must be integer').isInt(),
                body('scoreParticipantId', 'scoreParticipantId must be integer').isInt(),

            ];
        }
        case 'delete': {
            return [
                check('id').custom((id) => ObjectId.isValid(id)).withMessage('parameter id must be valid'),
            ];
        }
        case 'update': {
            return [
                check('id').custom((id) => ObjectId.isValid(id)).withMessage('parameter id must be valid'),
                body('onFloorParticipantId', 'onFloorParticipantId does not exist').exists(),
                body('scoreParticipantId', 'scoreParticipantId does not exist').exists(),
                body('onFloorParticipantId', 'onFloorParticipantId must be integer').isInt(),
                body('scoreParticipantId', 'scoreParticipantId must be integer').isInt(),

            ];
        }
    }
};