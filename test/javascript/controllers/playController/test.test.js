/**
 * Created by billsong on 16/1/4.
 */
var assert = require("assert");
/**
* @doc Demo for test Array by assert
*/
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });

        it('should return self when the value is present', function() {
            assert.equal(0,[1,2,3].indexOf(1));
            assert.equal(1,[1,2,3].indexOf(2));
            assert.equal(2,[1,2,3].indexOf(3));
        });
    });

    describe('#length()', function() {
        it('should return array length', function() {
            assert.equal(0, [].length);
            assert.equal(3, [1,2,3].length);
        });
    });

});

/**
* @doc Demo for test Dict by assert
*/
describe('Dict', function() {

    describe('#value()', function() {
        it('should return undefined when the key is not present', function() {
            assert.equal(undefined, {name:'song',age:27}.sex);
            assert.equal(undefined, {}.age);
        });

        it('should return value by key ', function() {
            assert.equal('song', {name:'song',age:27}.name);
            assert.equal(27, {name:'song',age:27}.age);
        });
    });

});



/**
 * @doc Demo for test by supertest
 * */
var app = require('../../../../app');
var request = require('supertest')(app);
var should = require("should");
var logger = require('../../../../config/logs');

describe('testDemo/test.js', function() {

    describe('#test()', function () {
        it('should return error when isShowTest is false', function (done) {
            var isShowTest = false;
            request.post('/test')
                .send({
                    isShowTest:isShowTest
                })
                .expect(200, function (err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('-1');
                    res.text.should.containEql('error');
                    done();
                });

        });
        it('should return success when isShowTest is true', function (done) {
            var isShowTest = true;
            request.post('/test')
                .send({
                    isShowTest:isShowTest
                })
                .expect(200, function (err, res) {
                    should.not.exist(err);
                    res.text.should.containEql('0');
                    res.text.should.containEql('success');
                    done();
                });

        });
    });
});

