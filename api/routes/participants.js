import express from 'express';
const router = express.Router();
import checkJwt from '../../auth/auth';
import validate from '../../auth/checkAuthorized';
//const checkAuthorized = require('../../auth/checkAuthorized');
const controller = require('../controllers/participants');
const validator = require('../validators/participants');

/**
 * Get all participants.
 * @group  participants
 * @route GET /
 * @produces application/json
 * @consumes application/json
 * @returns {Array.<ParticipantInfo>} 200 - An array of participants
 * @returns {Error}  default - Unexpected error
 */
router.get('/', controller.readAll);

router.get('/:id', controller.readById);

router.post('/', checkJwt, validate
    , validator.validate('create'), controller.create);

export default router;
