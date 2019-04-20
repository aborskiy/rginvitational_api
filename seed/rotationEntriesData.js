import model from '../api/models/rotationEntryModel';

const rotationEntries = [
    {
        "id": 1,
        "participantId": 908,
        "name": "Julia B",
        "team": "RUS",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 9.3,
          "exec": 9,
          "deduct": 0.1,
          "total": 18.2
        }
      },
      {
        "id": 2,
        "participantId": 909,
        "name": "Leah N",
        "team": "ISR",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 3,
        "participantId": 910,
        "name": "Alexandra S",
        "team": "GRE",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 4,
        "participantId": 905,
        "name": "Jasmine P",
        "team": "JAP",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 5,
        "participantId": 907,
        "name": "Anna M",
        "team": "UKR",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 6,
        "participantId": 904,
        "name": "Elizabeth T",
        "team": "FRA",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 7,
        "participantId": 906,
        "name": "Sarah T",
        "team": "ITA",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 8,
        "participantId": 903,
        "name": "Sophie C",
        "team": "IRE",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 9,
        "participantId": 902,
        "name": "Nicola M",
        "team": "CAN",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 10,
        "participantId": 901,
        "name": "Carol M",
        "team": "USA",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 11,
        "participantId": 909,
        "name": "Leah N",
        "team": "ISR",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 12,
        "participantId": 908,
        "name": "Julia B",
        "team": "RUS",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 13,
        "participantId": 905,
        "name": "Jasmine P",
        "team": "JAP",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 14,
        "participantId": 910,
        "name": "Alexandra S",
        "team": "GRE",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 15,
        "participantId": 904,
        "name": "Elizabeth T",
        "team": "FRA",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 16,
        "participantId": 907,
        "name": "Anna M",
        "team": "UKR",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 17,
        "participantId": 903,
        "name": "Sophie C",
        "team": "IRE",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 18,
        "participantId": 906,
        "name": "Sarah T",
        "team": "ITA",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 19,
        "participantId": 901,
        "name": "Carol M",
        "team": "USA",
        "apparatus": {
          "id": "floor",
          "imageurl": "images/floor-min-2.png"
        },
        "score": {
          "id": "floor",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 20,
        "participantId": 902,
        "name": "Nicola M",
        "team": "CAN",
        "apparatus": {
          "id": "rope",
          "imageurl": "images/rope-min-2.png"
        },
        "score": {
          "id": "rope",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 21,
        "participantId": 908,
        "name": "Julia B",
        "team": "RUS",
        "apparatus": {
          "id": "hoop",
          "imageurl": "images/hoop-min-2.png"
        },
        "score": {
          "id": "hoop",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      },
      {
        "id": 22,
        "participantId": 909,
        "name": "Leah N",
        "team": "ISR",
        "apparatus": {
          "id": "ribbon",
          "imageurl": "images/ribbon-min-2.png"
        },
        "score": {
          "id": "ribbon",
          "diff": 0,
          "exec": 0,
          "deduct": 0,
          "total": 0
        }
      }
];

export default async function loadRotationEntries() {
    try {
        console.log(`loadRotationEntries starts!`);
        await model.deleteMany();
        // insertMany & insertOne functions get around auto increment in mongoose-sequence, use create instead
        //await participantInfoModel.collection.insertMany(participantInfo);
        await model.create(rotationEntries);
        console.info(`Seed rotationEntriesData ${rotationEntries.length} entries were successfully stored.`);
    } catch (err) {
        console.error(`failed to Load Rotation Entries Data: ${err}`);
    }
}