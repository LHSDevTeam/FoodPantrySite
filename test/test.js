var expect = require('chai').expect;
var request = require('request');
const server = require('../src/js/out/main').server;

describe('Server Connections', function() {
    describe('Web Pages', function() {
        it("Home Page", function(done) {
            request("http://127.0.0.1:1337/", function(error, response, body) {
                console.log(response);
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Login Page", function(done) {
            request("http://127.0.0.1:1337/login", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Dashboard Page", function(done) {
            request("http://127.0.0.1:1337/dashboard", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Scanner Page", function(done) {
            request("http://127.0.0.1:1337/scanner", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Checkout Page", function(done) {
            request("http://127.0.0.1:1337/checkout", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Account Page", function(done) {
            request("http://127.0.0.1:1337/account", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("Admin Page", function(done) {
            request("http://127.0.0.1:1337/admin", function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("404 Page", function(done) {
            request("http://127.0.0.1:1337/sdagasg", function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });
});

after(done => {
    server.close(done);
})
