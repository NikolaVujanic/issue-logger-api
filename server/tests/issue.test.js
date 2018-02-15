var mongoose = require("mongoose");
var {Issue} = require('../models/issue');
var {ObjectID} = require('mongodb');

var chai = require('chai');
var chaiHttp = require('chai-http');
var {app} = require('../server');
var should = chai.should();

chai.use(chaiHttp);

// Fake data
const issues = [{
    _id: new ObjectID(),
    title: 'First test issue',
    description: 'TEST text'
}, {
    _id: new ObjectID(),
    title: 'Second test issue',
    description: 'TEST text'
}]

describe('Issue', () => {
    // Empty the database before each test
    beforeEach((done) => {
        Issue.remove({}, (err) => { 
           return Issue.insertMany(issues).then(() => done());    
        });     
    });

    // Test GET /issues
    describe('GET /issues', () => {
        it('it should GET all issues', (done) => {
            chai.request(app)
                .get('/issues')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.issues.should.be.a('array');
                    res.body.issues.length.should.be.eql(2);
                done();
                });
        });
    });

    // Test GET /issues/:issueId
    describe('GET /issues/:issueId', () => {
        it('it should GET single issues by id', (done) => {
            chai.request(app)
                .get(`/issues/${issues[0]._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.issue.title.should.be.eql(issues[0].title);
                    res.body.issue.description.should.be.eql(issues[0].description);
                done();
                });
        });
    });

    // Test POST /issues
    describe('POST /issues', () => {
        it('should create a new issue', (done) => {
            var issue = {
                title: 'Test issue',
                description: 'Test description'
            };
    
            chai.request(app)
                .post('/issues')
                .send(issue)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.issue.should.be.a('object');
                    res.body.issue.title.should.be.eql(issue.title);
                    res.body.issue.description.should.be.eql(issue.description);
                    res.body.issue.files.should.be.a('array');
                    res.body.issue.comments.should.be.a('array');
                    res.body.issue.completed.should.equal(false);
                done();
                });
        });
    });

    // Test DELETE /issues/:issueId
    describe('DELETE /issues/:issueId', () => {
        it('should remove issue', (done) => {
            var issueId = issues[0]._id;
    
            chai.request(app)
                .get('/issues')
                .end((err, res) => {
                    chai.request(app)
                        .delete(`/issues/${issueId}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.issue.should.be.a('object');
                            res.body.issue.files.should.be.a('array');
                            res.body.issue.comments.should.be.a('array');
                            res.body.issue.completed.should.equal(false);
                        done();
                        });
                });
        });
    });
});