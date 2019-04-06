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
  return res.send(participants);
}));

router.post('/', checkJwt, asyncHandler(async (req, res) => {
  const participant = await ParticipantInfo.create(req.body);
  return res.status(201).send({ participant });
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
  return res.status(204).send(participant);
}));

export default router;