import express from 'express';
//import { participantInfo } from './participants';
import ParticipantInfo from './participantInfoModel';
import asyncHandler from 'express-async-handler';
import checkJwt from '../../auth';

console.log(`participants before creating express router`);
const router = express.Router(); // eslint-disable-line

/**
 * Get all participants.
 * @group  participants
 * @route GET /
 * @produces application/json
 * @consumes application/json
 * @returns {Array.<ParticipantInfo>} 200 - An array of participants
 * @returns {Error}  default - Unexpected error
 */
router.get('/', asyncHandler(async (req, res) => {
  const participants = await ParticipantInfo.find();
  return res.status(200).json(participants);
}));

//router.get('/:id', validate('createUser'), asyncHandler(async (req, res) => {
router.get('/:id', asyncHandler(async (req, res) => {  
  try {
    console.log(`participants.router.get by id`);
    const participant = await ParticipantInfo.findOne({ id: req.params.id }, (err, participant) => {
      if (err) {
        console.log(`participants.router.get by id err: ${err} err.message: ${err.message}`);
        handleError(err, err.message);
      }
      if (!participant) {
        console.log(`participants.router.get by id participant not found - returning 404`);
        return res.sendStatus(404);
      }

    }
    );

    return res.status(200).json(participant);
  }
  catch (error) {
    handleError(res, error.message);
  }

}));

router.post('/', checkJwt, asyncHandler(async (req, res) => {
  console.log(`participants.router.post starts`);
  const participant = await ParticipantInfo.create(req.body, (err, participant) => {
    if (err) {
      console.log(`participants.router.post err: ${err} err.message: ${err.message}`);
      handleError(err, err.message);
    }
    return res.status(201).json(participant);
  });

}));

router.put('/:id', checkJwt, asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const participant = await ParticipantInfo.updateOne({
    _id: req.params.id,
  }, req.body, { upsert: false });
  if (!participant) return res.sendStatus(404);
  return res.status(200).json(participant);

}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const participant = await ParticipantInfo.findById(req.params.id);
  if (!participant) return res.send(404);
  await participant.remove();
  return res.status(204).json(participant);
}));

/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.status(500).json(err);
};


export default router;