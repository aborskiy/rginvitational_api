import should from 'should';
import rotationSessionModel from '../../../api/models/rotationSessionModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('rotationSessionModel Tests', () => {

    let rotationSession = {};
    let rotationSessionMissingParms = {};
    //create a rotationSession
    beforeEach(() => {
        rotationSession = {
          "onFloorParticipantId": 3,
          "scoreParticipantId": 1
        };
        rotationSessionMissingParms = {
        }; 
    });

    it('should validate a rotationSession', (done) => {
        const model = new rotationSessionModel(rotationSession);
        console.log(`rotationSessionModel instance: ${model}`);
        model.validate((err) => {
            should.not.exist(err);
            console.log(`test rotationSessionModel model ${model}`);
            model.should.have.property('onFloorParticipantId');
            model.should.have.property('scoreParticipantId');
            should(model.onFloorParticipantId).be.a.Number();
            should(model.scoreParticipantId).be.a.Number();
            model.onFloorParticipantId.should.equal(rotationSession.onFloorParticipantId);
            model.scoreParticipantId.should.equal(rotationSession.scoreParticipantId);
            model.updated.should.be.an.instanceof(Date);
            done();
        });
    });

    it('should validate required properties', (done) => {
        const model = new rotationSessionModel(rotationSessionMissingParms);
        model.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("onFloorParticipantId");
            errors.should.have.property("scoreParticipantId");
            done();
        });
    });
});    
