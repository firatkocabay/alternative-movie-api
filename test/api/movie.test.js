const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

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

    describe('Get all movie API test', () => {
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

    describe('Create a movie API test', () => {
        it('it should created a movie', (done) => {
            const movie = {
                title: 'Yes Man',
                director_id: '6188fe028b864795ab24dfab',
                year: 2010,
                imdbScore: 9.2
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdbScore');
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe('Get a movie with an id', () => {
        it('Should get a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(movieId);
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdbScore');
                    done();
                });
        })
    })

});