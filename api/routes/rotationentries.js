import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
//const controller = require('../controllers/rotationentries.js');
import controller from '../controllers/rotationentries.js';
const validator = require('../validators/rotationentries');
//const commonValidator = require('../validators/common');
import commonValidator from '../validators/common';
//const bulkController = require('../controllers/rotationentriesBulk.js');
import bulkController from '../controllers/rotationentriesBulk.js';
const bulkValidator = require('../validators/rotationentriesBulk');
import tracker from '../analytics/tracker';

function X_ACTION_NOT_BULK(req, res, next) {
    //console.log(`X_ACTION_NOT_BULK`);
    //console.log(`req.headers['x-action']: ${req.headers['x-action']}`);
    //console.log(`req.headers['x-action'].trim(): ${req.headers['x-action'].trim()}`);
    //console.log(`req.headers['x-action'].trim() !== 'bulk' ${req.headers['x-action'].trim() !== 'bulk'}`);
    //console.log(`req.headers['x-action'].trim() !== 'bulk' ? next() : next("route") ${req.headers['x-action'].trim() !== 'bulk' ? next() : next("route")}`)
    return req.headers['x-action'] === undefined || req.headers['x-action'].trim() !== 'bulk' ? next() : next("route");
}
function X_ACTION_IS_BULK(req, res, next) { return req.headers['x-action'] !== undefined && req.headers['x-action'].trim() === 'bulk' ? next() : next("route"); }


/**
 * Get all rotation entries.
 * @group  rotationentries
 * @route GET /api/rotationentries
 * @produces application/json
 * @returns {Array.<RotationEntry>} 200 - An array of rotation entries
 * @returns {Error}  default - Unexpected error
 */
router.get('/',
    tracker.trackRequest,
    controller.readAll);

/**
 * Post rotation entry.
 * @group rotationentries
 * @route POST /api/rotationentries
 * @param {RotationEntry.model} rotationEntry.body.required - the new Rotation entry
 * @produces application/json
 * @consumes application/json
 * @returns {rotationEntry} 201 - rotationEntry
 * @security JWT
 */
router.post('/',
    tracker.trackRequest,
    checkJwt,
    checkAuthorized,
    commonValidator.printRequest,
    X_ACTION_NOT_BULK,
    validator.validate('create'),
    commonValidator.checkValidationResults,
    controller.create);

/**
 * Post multiple rotation entries.
 * @group rotationentries bulk
 * @route POST /api/rotationentries
 * @headers {string} X-Action - bulk, when posting multiple entries.
 * @param {Array.<RotationEntry>} Array.<rotationEntry>.body.required - Array of new Rotation Entries
 * @produces application/json
 * @consumes application/json
 * @returns {Array.<rotationEntry>} 201 - rotationEntry
 * @security JWT
 */
router.post('/',
    tracker.trackRequest,
    checkJwt,
    checkAuthorized,
    commonValidator.printRequest,
    X_ACTION_IS_BULK,
    bulkValidator.validate('create'),
    commonValidator.checkValidationResults,
    bulkController.create);


/**
 * PUT rotation entry.
 * @group rotationentries
 * @route PUT /api/rotationentries/{id}
 * @param {RotationEntry.model} rotationEntry.body.required - the updating rotation Entry
 * @param {integer} id.path.required - application id of rotation Entry
 * @produces application/json
 * @consumes application/json
 * @returns {rotationEntry} 200 - rotation Entry
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
 * DELETE rotation Entry.
 * @group rotationentries
 * @route DELETE /api/rotationentries/{id}
 * @param {integer} id.path.required - application id of rotation Entry
 * @produces application/json
 * @consumes application/json
 * @returns {rotationEntry} 200 - rotation Entry
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
 * DELETE multiple rotation entries.
 * @group rotationentries bulk
 * @route DELETE /api/rotationentries
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