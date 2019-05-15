import participantInfoModel from '../api/models/participantInfoModel';

const participantInfo = [
    {

        "name": {
            "first": "Carol",
            "last": "MacDonald"
        },
        "team": "USA"
    },
    {

        "name": {
            "first": "Nicola",
            "last": "Mills"
        },
        "team": "Canada"
    },
    {

        "name": {
            "first": "Sophie",
            "last": "Carr"
        },
        "team": "Ireland"
    },
    {

        "name": {
            "first": "Elizabeth",
            "last": "Terry"
        },
        "team": "France"
    },
    {

        "name": {
            "first": "Jasmine",
            "last": "Parsons"
        },
        "team": "Japan"
    },
    {

        "name": {
            "first": "Sarah",
            "last": "Taylor"
        },
        "team": "Italy"
    },
    {

        "name": {
            "first": "Anna",
            "last": "Mitchell"
        },
        "team": "Ukraine"
    },
    {

        "name": {
            "first": "Julia",
            "last": "Blake"
        },
        "team": "Russia"
    },
    {

        "name": {
            "first": "Leah",
            "last": "Newman"
        },
        "team": "Israel"
    },
    {

        "name": {
            "first": "Alexandra",
            "last": "Sharp"
        },
        "team": "Greece"
    }
];

export default async function loadParticipants() {
    try {
        console.info(`Seed participantsInfoData starts.`);
        await participantInfoModel.deleteMany();
        console.info(`Seed participantsInfoData delete is done.`);
        // insertMany & insertOne functions get around auto increment in mongoose-sequence, use create instead
        //await participantInfoModel.collection.insertMany(participantInfo);
        await participantInfoModel.create(participantInfo);
        console.info(`Seed participantsInfoData ${participantInfo.length} participants were successfully stored.`);
    } catch (err) {
        console.error(`failed to Load Participant Info Data: ${err}`);
    }
}