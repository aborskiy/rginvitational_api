import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
//const controller = require('../controllers/rotationsession.js');
import controller from '../controllers/rotationsession.js';
const validator = require('../validators/rotationsession');
//const commonValidator = require('../validators/common');
import commonValidator from '../validators/common';
import tracker from '../analytics/tracker';

/**
 * Get all rotation session.
 * @group  rotationsession
 * @route GET /api/rotationsession
 * @produces application/json
 * @returns {RotationSession.model} 200 - Rotation session
 * @returns {Error}  default - Unexpected error
 */
router.get('/',
    tracker.trackRequest,
    controller.readAll);

/**
 * Post rotation session.
 * @group rotationsession
 * @route POST /api/rotationsession
 * @param {RotationSession.model} rotationSession.body.required - the new rotation session
 * @produces application/json
 * @consumes application/json
 * @returns {RotationSession.model} 201 - rotationSession
 * @security JWT
 */
router.post('/',
    tracker.trackRequest,
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
 * @returns {RotationSession} 200 - rotation session
 * @security JWT
 */
router.put('/:id',
    tracker.trackRequest,
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
 * @returns {RotationSession} 200 - rotation session
 * @security JWT
 */
router.delete('/:id',
    tracker.trackRequest,
    checkJwt,
    checkAuthorized,
    validator.validate('delete'),
    commonValidator.checkValidationResults,
    controller.delete);




export default router;            