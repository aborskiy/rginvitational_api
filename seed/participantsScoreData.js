import participantScoreModel from '../api/models/participantScoreModel';

const participantScores = [
    {
        "id": 901,
        "name": "Carol MacDonald",
        "team": "USA",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 902,
        "name": "Nicola Mills",
        "team": "Canada",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 903,
        "name": "Sophie Carr",
        "team": "Ireland",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 904,
        "name": "Elizabeth Terry",
        "team": "France",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 905,
        "name": "Jasmine Parsons",
        "team": "Japan",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 906,
        "name": "Sarah Taylor",
        "team": "Italy",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 907,
        "name": "Anna Mitchell",
        "team": "Ukraine",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 908,
        "name": "Julia Blake",
        "team": "Russia",
        "scores": [
            {
                "id": "floor",
                "diff": 9.3,
                "exec": 9,
                "deduct": 0.1,
                "total": 18.2
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 18.2
    },
    {
        "id": 909,
        "name": "Leah Newman",
        "team": "Israel",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    },
    {
        "id": 910,
        "name": "Alexandra Sharp",
        "team": "Greece",
        "scores": [
            {
                "id": "floor",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "rope",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "hoop",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            },
            {
                "id": "ribbon",
                "diff": 0,
                "exec": 0,
                "deduct": 0,
                "total": 0
            }
        ],
        "total": 0
    }
];

export default async function loadParticipantsScores() {
    try {
        console.log(`loadParticipantsScores starts!`);
        await participantScoreModel.deleteMany();
        // insertMany & insertOne functions get around auto increment in mongoose-sequence, use create instead
        //await participantInfoModel.collection.insertMany(participantInfo);
        await participantScoreModel.create(participantScores);
        console.info(`Seed participantsScoreData ${participantScores.length} participants were successfully stored.`);
    } catch (err) {
        console.error(`failed to Load Participant Scores Data: ${err}`);
    }
}