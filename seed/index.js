import loadParticipants from './participantsInfoData';
import loadParticipantsScores from './participantsScoreData';
import loadRotationEntries from './rotationEntriesData';

export default async () => {
    console.log(`seed function starts`);
    await loadParticipants();
    await loadParticipantsScores();
    await loadRotationEntries();
};