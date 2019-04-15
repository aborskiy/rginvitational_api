import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
//const checkAuthorized = require('../../auth/checkAuthorized');
const controller = require('../controllers/participants');
const validator = require('../validators/participants');
const commonValidator = require('../validators/common');

/**
 * Get all participants.
 * @group  participants
 * @route GET /api/participants
 * @produces application/json
 * @returns {Array.<ParticipantInfo>} 200 - An array of participants
 * @returns {Error}  default - Unexpected error
 */
router.get('/', 
            controller.readAll);

/**
 * Get participant by id.
 * @group participants
 * @route GET /api/participants/{id}
 * @param {integer} id.path.required - application id of participant
 * @produces application/json
 * @returns {ParticipantInfo} 200 - Participant
 */
router.get('/:id', 
            validator.validate('get'), 
            commonValidator.checkValidationResults,
            controller.readById);

/**
 * Post participant.
 * @group participants
 * @route POST /api/participants
 * @param {ParticipantInfo.model} participant.body.required - the new participant
 * @produces application/json
 * @consumes application/json
 * @returns {ParticipantInfo} 201 - Participant
 * @security JWT
 */
router.post('/', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('create'), 
            commonValidator.checkValidationResults, 
            controller.create);

/**
 * PUT participant.
 * @group participants
 * @route PUT /api/participants/{id}
 * @param {ParticipantInfo.model} participant.body.required - the updating participant
 * @param {integer} id.path.required - application id of participant
 * @produces application/json
 * @consumes application/json
 * @returns {ParticipantInfo} 200 - Participant
 * @security JWT
 */
router.put('/:id', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('update'), 
            commonValidator.checkValidationResults,
            controller.update);

            
/**
 * DELETE participant.
 * @group participants
 * @route DELETE /api/participants/{id}
 * @param {integer} id.path.required - application id of participant
 * @produces application/json
 * @consumes application/json
 * @returns {ParticipantInfo} 200 - Participant
 * @security JWT
 */
router.delete('/:id', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('get'), 
            commonValidator.checkValidationResults,
            controller.delete);

export default router;
