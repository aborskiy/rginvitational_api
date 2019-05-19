import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
//const controller = require('../controllers/scores');
import controller from '../controllers/scores';
const validator = require('../validators/scores');

import commonValidator from '../validators/common';
import bulkController from '../controllers/scoresBulk.js';
const bulkValidator = require('../validators/scoresBulk');
import tracker from '../analytics/tracker';


function X_ACTION_NOT_BULK(req, res, next) {
    console.log(`X_ACTION_NOT_BULK`);
    console.log(`req.headers['x-action']: ${req.headers['x-action']}`);
    //console.log(`req.headers['x-action'].trim(): ${req.headers['x-action'].trim()}`);
    //console.log(`req.headers['x-action'].trim() !== 'bulk' ${req.headers['x-action'].trim() !== 'bulk'}`);
    //console.log(`req.headers['x-action'].trim() !== 'bulk' ? next() : next("route") ${req.headers['x-action'].trim() !== 'bulk' ? next() : next("route")}`)
    return req.headers['x-action'] === undefined || req.headers['x-action'].trim() !== 'bulk' ? next() : next("route");
}
function X_ACTION_IS_BULK(req, res, next) { return req.headers['x-action'] !== undefined && req.headers['x-action'].trim() === 'bulk' ? next() : next("route"); }


/**
 * Get all scores.
 * @group  scores
 * @route GET /api/scores
 * @produces application/json
 * @returns {Array.<ParticipantScore>} 200 - An array of scores
 * @returns {Error}  default - Unexpected error
 */
router.get('/',
    tracker.trackRequest,
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
    tracker.trackRequest,
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
    tracker.trackRequest,
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
    tracker.trackRequest,
    checkJwt,
    checkAuthorized,
    X_ACTION_NOT_BULK,
    validator.validate('delete'),
    commonValidator.checkValidationResults,
    controller.delete);


/**
 * DELETE all scores.
 * @group scores bulk
 * @route DELETE /api/scores
 * @headers {string} X-Action - bulk, when deleting multiple entries.
 * @produces application/json
 * @consumes application/json
 * @returns HTTP Status 200 
 * @security JWT
 */
router.delete('/',
    tracker.trackRequest,
    checkJwt,
    checkAuthorized,
    X_ACTION_IS_BULK,
    bulkValidator.validate('delete'),
    commonValidator.checkValidationResults,
    bulkController.delete,
    commonValidator.printRequest);



export default router;

