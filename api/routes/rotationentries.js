import express from 'express';
const router = express.Router();

import checkJwt from '../../auth/auth';
import checkAuthorized from '../../auth/checkAuthorized';
const controller = require('../controllers/rotationentries');
const validator = require('../validators/rotationentries');
const commonValidator = require('../validators/common');

/**
 * Get all rotation entriess.
 * @group  rotationentries
 * @route GET /api/rotationentries
 * @produces application/json
 * @returns {Array.<rotationEntry>} 200 - An array of rotation entries
 * @returns {Error}  default - Unexpected error
 */
router.get('/', 
            controller.readAll);
