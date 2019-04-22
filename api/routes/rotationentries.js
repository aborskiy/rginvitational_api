import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
const controller = require('../controllers/rotationentries.js');
const validator = require('../validators/rotationentries');
const commonValidator = require('../validators/common');

/**
 * Get all rotation entries.
 * @group  rotationentries
 * @route GET /api/rotationentries
 * @produces application/json
 * @returns {Array.<rotationEntry>} 200 - An array of rotation entries
 * @returns {Error}  default - Unexpected error
 */
router.get('/',
    controller.readAll);

/**
 * Post rotation entry.
 * @group rotationentries
 * @route POST /api/rotationentries
 * @param {rotationEntry.model} rotationEntry.body.required - the new Rotation entry
 * @produces application/json
 * @consumes application/json
 * @returns {rotationEntry} 201 - rotationEntry
 * @security JWT
 */
router.post('/', 
            checkJwt, 
            checkAuthorized, 
            validator.validate('create'),
            commonValidator.checkValidationResults, 
            controller.create);

/**
 * PUT rotation entry.
 * @group rotationentries
 * @route PUT /api/rotationentries/{id}
 * @param {rotationEntry.model} rotationEntry.body.required - the updating rotation Entry
 * @param {integer} id.path.required - application id of rotation Entry
 * @produces application/json
 * @consumes application/json
 * @returns {rotationEntry} 200 - rotation Entry
 * @security JWT
 */
router.put('/:id', 
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
            checkJwt, 
            checkAuthorized, 
            validator.validate('delete'), 
            commonValidator.checkValidationResults,
            controller.delete);




export default router;            