import should from 'should';
import participantScoreModel from '../../../api/models/participantScoreModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('participantScoreModel Tests', () => {

    let participantScores = {};
    //create a participantScores
    beforeEach(() => {
        participantScores = {
            "id": 378,
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
          };
    });

    it('should validate a participantScore', (done) => {
        const model = new participantScoreModel(participantScores);
        model.validate((err) => {
            should.not.exist(err);
            console.log(`test participantScoreModel model ${model}`);
            model.should.have.property('id');
            model.should.have.property('name');
            model.should.have.property('team');
            model.should.have.property('scores');
            model.should.have.property('updated');
            model.should.have.property('total');
            should(model.name).be.a.String();
            model.name.should.equal(participantScores.name);
            model.team.should.equal(participantScores.team);
            model.scores.should.be.an.instanceof(Array);
            model.scores.length.should.equal(4);  
            model.scores[0].should.have.property('id');
            should(model.scores[0].id).be.a.String();
            model.scores[0].id.should.equal(participantScores.scores[0].id);
            model.updated.should.be.an.instanceof(Date);
            done();
        });
    });

    it('should validate required properties', (done) => {

        const badParticipantScores = {
            model: "Not real"
        };
        const model = new participantScoreModel(badParticipantScores);
        model.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("id");
            errors.should.have.property("name");
            errors.should.have.property("team");
            errors.should.have.property("total");
            done();
        });
    });

});    
