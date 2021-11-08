const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('Movie API Tests', () => {
    before((done) => {
        chai.request(server)
            .post('/login')
            .send({ username: 'fkocabay2', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('Movie API Tests', () => {
        it('It should be return all movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});