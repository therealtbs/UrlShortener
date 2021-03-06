var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
var app = require('./server/app');
var config = require('./config');
describe('Service', function() {  
    describe('Link', function() {
        
        it('should deny us access', function(done) {
        
            request(app)
        	.get('/admin/api/links')
            .expect(401, done);
    	
        });
        
        it('should list no links', function(done) {
        
            request(app)
        	.get('/admin/api/links')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                res.body.should.have.a.lengthOf(0);
                done();
            });
    	
        });
        
        it('should save Link with url \'test\'', function(done) {
            var link = {
                url: 'http://google.com',
                link: 'test'
            };
        
            request(app)
        	.post('/admin/api/links')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
        	.send(link)
            .expect(201)
        	.end(function(err, res) {
                  if (err) {
                    throw err;
                  }
                  res.body.should.have.properties(link);
                  res.body.should.have.property('stats').with.lengthOf(0);
                  
                  done();
            });
        });
        
        it('should list 1 link', function(done) {
        
            request(app)
        	.get('/admin/api/links')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                res.body.should.have.a.lengthOf(1);
                done();
            });
    	
        });
        
        it('should show no visits for \'test\'', function(done) {
            
            request(app)
        	.get('/admin/api/links/test')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                res.body.should.have.property('stats').with.lengthOf(0);
                done();
            });
            
        });
        
        it('should redirect to \'http://google.com\'', function(done) {
            request(app)
            .get('/test')
            .expect(302)
            .expect('Location', 'http://google.com')
            .end(done);
        });
        
        it('should show 1 visit for \'test\'', function(done) {
            request(app)
        	.get('/admin/api/links/test')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                res.body.should.have.property('stats').with.lengthOf(1);
                done();
            });
        });
        
        it('should delete the link', function(done) {
            request(app)
        	.delete('/admin/api/links/test')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
            .expect(204, done);
        });
        
        it('should list no links', function(done) {
        
            request(app)
        	.get('/admin/api/links')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                res.body.should.have.a.lengthOf(0);
                done();
            });
    	
        });
    });
    
    describe('Random', function() {
        it('should generate a random link to \'http://google.com\'', function (done) {
            request(app)
        	.post('/admin/api/links')
        	.set('Authorization', 'Basic ' + new Buffer(config.username + ':' + config.password).toString('base64'))
        	.send({url: 'http://google.com'})
            .expect(201)
        	.end(function(err, res) {
                  if (err) {
                    throw err;
                  }
                  res.body.should.have.property('link');
                  res.body.should.have.property('stats').with.lengthOf(0);
                  
                  done();
            });
        });
    });
});