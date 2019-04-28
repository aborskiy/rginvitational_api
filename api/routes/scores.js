import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
//const controller = require('../controllers/scores');
import controller from '../controllers/scores';
const validator = require('../validators/scores');
//const commonValidator = require('../validators/common');
import commonValidator from '../validators/common';

/**
 * Get all scores.
 * @group  scores
 * @route GET /api/scores
 * @produces application/json
 * @returns {Array.<ParticipantScore>} 200 - An array of scores
 * @returns {Error}  default - Unexpected error
 */
router.get('/', 
            controller.readAll);

/**
 * Post score.
 * @group scores
 * @route POST /api/scores
 * @param {ParticipantScore.model} participantScore.body.required - the new Score entry for score
 * @produces application/json
 * @consumes application/json
 * @returns {scoreScore} 201 - scoreScore
 * @security JWT
 */
router.post('/', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('create'), 
            commonValidator.checkValidationResults, 
            controller.create);


/**
 * PUT score.
 * @group scores
 * @route PUT /api/scores/{id}
 * @param {ParticipantScore.model} score.body.required - the updating score
 * @param {integer} id.path.required - application id of score
 * @produces application/json
 * @consumes application/json
 * @returns {participantScore} 200 - score
 * @security JWT
 */
router.put('/:id', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('update'), 
            commonValidator.checkValidationResults,
            controller.update);

            
/**
 * DELETE score.
 * @group scores
 * @route DELETE /api/scores/{id}
 * @param {integer} id.path.required - application id of score
 * @produces application/json
 * @consumes application/json
 * @returns {ParticipantScore} 200 - score
 * @security JWT
 */
router.delete('/:id', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('delete'), 
            commonValidator.checkValidationResults,
            controller.delete);

export default router;

