var app = require(__dirname+'/../index.js');

exports.test = function(test){
    test.expect(1);
    test.ok(true,'world' == app.hello());
    test.done();
};