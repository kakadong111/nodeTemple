/**
 * Created by billsong on 15-5-14.
 */
/*
 routes.js
 */

module.exports = function(app){
    var test = require('./controllers/test');
    //app.get('/test' ,test.test);
    app.post('/test' ,test.test);
};





