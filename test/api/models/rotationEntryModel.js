import should from 'should';
import rotationEntryModel from '../../../api/models/rotationEntryModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('rotationEntryModel Tests', () => {

    let rotationEntry = {};
    let rotationEntryInvalidApparatusId = {};
    //create a rotationEntry
    beforeEach(() => {
        rotationEntry = {
          "rotaId": 1,
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
        };
        rotationEntryInvalidApparatusId = {
            "rotaId": 2,
            "participantId": 908,
            "name": "Julia B",
            "team": "RUS",
            "apparatus": {
              "id": "dummy",
              "imageurl": "images/floor-min-2.png"
            },
            "score": {
              "id": "floor",
              "diff": 9.3,
              "exec": 9,
              "deduct": 0.1,
              "total": 18.2
            }
          }; 
    });

    it('should validate a rotationEntry', (done) => {
        const model = new rotationEntryModel(rotationEntry);
        console.log(`rotationEntryModel instance: ${model}`);
        model.validate((err) => {
            should.not.exist(err);
            console.log(`test rotationEntryModel model ${model}`);
            model.should.have.property('rotaId');
            model.should.have.property('participantId');
            model.should.have.property('name');
            model.should.have.property('team');
            model.should.have.property('apparatus');
            model.should.have.property('score');
            model.should.have.property('updated');
            should(model.rotaId).be.a.Number();
            should(model.participantId).be.a.Number();
            should(model.name).be.a.String();
            model.rotaId.should.equal(rotationEntry.rotaId);
            model.team.should.equal(rotationEntry.team);
            model.score.should.have.property('id');
            should(model.score.id).be.a.String();
            model.score.id.should.equal(rotationEntry.score.id);
            model.updated.should.be.an.instanceof(Date);
            done();
        });
    });

    it('should validate required properties', (done) => {
        const badRotationEntry = {
            model: "Not real"
        };
        const model = new rotationEntryModel(badRotationEntry);
        model.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("participantId");
            errors.should.have.property("name");
            errors.should.have.property("team");
            done();
        });
    });

    it('should fail when invalid apparatus id', (done) => {
        const model = new rotationEntryModel(rotationEntryInvalidApparatusId);
        model.validate((err) => {
            const errors = err.errors;
            console.log(`errors: ${errors.MongooseError}`);
            errors.should.have.property("apparatus.id");
            errors["apparatus.id"].should.have.property("name");
            errors["apparatus.id"].name.should.equal('ValidatorError');
            errors["apparatus.id"].message.should.equal('`dummy` is not a valid enum value for path `id`.');
            done();
        });
    });


});    
