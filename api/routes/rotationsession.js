import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
const controller = require('../controllers/rotationsession.js');
const validator = require('../validators/rotationsession');
const commonValidator = require('../validators/common');

/**
 * Get all rotation session.
 * @group  rotationsession
 * @route GET /api/rotationsession
 * @produces application/json
 * @returns {rotationSession.model} 200 - An array of rotation session
 * @returns {Error}  default - Unexpected error
 */
router.get('/',
    controller.readAll);

/**
 * Post rotation session.
 * @group rotationsession
 * @route POST /api/rotationsession
 * @param {rotationSession.model} rotationSession.body.required - the new rotation session
 * @produces application/json
 * @consumes application/json
 * @returns {rotationSession} 201 - rotationSession
 * @security JWT
 */
router.post('/', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('create'), 
            commonValidator.checkValidationResults, 
            controller.create);

/**
 * PUT rotation session.
 * @group rotationsession
 * @route PUT /api/rotationsession/{id}
 * @param {rotationSession.model} rotationSession.body.required - the updating rotation session
 * @param {integer} id.path.required - application id of rotation session
 * @produces application/json
 * @consumes application/json
 * @returns {rotationSession} 200 - rotation session
 * @security JWT
 */
router.put('/:id', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('update'), 
            commonValidator.checkValidationResults,
            controller.update);
            
/**
 * DELETE rotation session.
 * @group rotationsession
 * @route DELETE /api/rotationsession/{id}
 * @param {integer} id.path.required - application id of rotation session
 * @produces application/json
 * @consumes application/json
 * @returns {rotationSession} 200 - rotation session
 * @security JWT
 */
router.delete('/:id', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('delete'), 
            commonValidator.checkValidationResults,
            controller.delete);




export default router;            