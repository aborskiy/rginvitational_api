import express from 'express';
//import { participantInfo } from './participants';
import ParticipantInfo from './participantInfoModel';
import asyncHandler from 'express-async-handler';
import { readdirSync } from 'fs';

const router = express.Router(); // eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
  const participants = await ParticipantInfo.find();
  return res.send(participants);
}));

router.post('/', asyncHandler(async (req, res) => {
  const participant = await ParticipantInfo.create(req.body);
  return res.status(201).send({ participant });
}));

router.put('/:id', asyncHandler(async (req, res) => {
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