import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
const controller = require('../controllers/rotationentriesBulk.js');
const validator = require('../validators/rotationentriesBulk');
const commonValidator = require('../validators/common');

/**
 * Post multiple rotation entries.
 * @group rotationentries bulk
 * @route POST /api/rotationentries
 * @headers {string} X-Action - bulk, when posting multiple entries.
 * @param {Array.<rotationEntry>} Array.<rotationEntry>.body.required - Array of new Rotation Entries
 * @produces application/json
 * @consumes application/json
 * @returns {Array.<rotationEntry>} 201 - rotationEntry
 * @security JWT
 */
router.post('/', 
            checkJwt, 
            checkAuthorized, 
            commonValidator.printRequest,
            validator.validate('create'),
            commonValidator.checkValidationResults, 
            controller.create);

            
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
//router.delete('/:id', 
//            checkJwt, 
//            checkAuthorized, 
//            validator.validate('delete'), 
//            commonValidator.checkValidationResults,
//            controller.delete);




export default router;            