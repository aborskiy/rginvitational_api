import should from 'should';
import participantInfoModel from '../../../api/models/participantInfoModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('participantInfoModel Tests', () => {

    let participantInfo = {};
    //create a participant with random id before each test
    beforeEach(() => {
        participantInfo = {
            "name": {
                "first": "Carol",
                "last": "MacDonald"
            },
            "team": "USA"
        };
    });

    it('should validate a participantInfo', (done) => {
        const model = new participantInfoModel(participantInfo);
        model.validate((err) => {
            should.not.exist(err);
            console.log(`test participantInfoModel model ${model}`);
            model.should.have.property('name');
            model.should.have.property('team');
            model.should.have.property('updated');
            should(model.name.first).be.a.String();
            model.name.first.should.equal(participantInfo.name.first);
            model.name.last.should.equal(participantInfo.name.last);
            model.team.should.equal(participantInfo.team);
            model.updated.should.be.an.instanceof(Date);
            done();
        });
    });

    it('should validate required properties', (done) => {

        const badParticipantInfo = {
            model: "Not real"
        };
        const model = new participantInfoModel(badParticipantInfo);
        model.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("name.first");
            errors.should.have.property("name.last");
            errors.should.have.property("team");
            done();
        });
    });

});    
