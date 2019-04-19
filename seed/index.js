import loadParticipants from './participantsInfoData';
import loadParticipantsScores from './participantsScoreData';

export default async () => {
    console.log(`seed function starts`);
    //await loadParticipants();
    await loadParticipantsScores();
};