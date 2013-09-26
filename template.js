'use strict';

exports.description = "Create a Node Module, including Nodeunit unit tests";
exports.notes = "";

exports.after = "You should now install project dependencies with _npm install_." +
    " After that, you may start the environment with _grunt_.";

exports.warnOn = '*';

exports.template = function(grunt, init, done){
    init.process({},[
        init.prompt("name"),
        init.prompt("description"),
        init.prompt("version"),
        init.prompt("repository"),
        init.prompt("homepage"),
        init.prompt("bugs"),
        init.prompt("author")
    ],function(err,props){

        props.keywords = [];

        props.devDependencies = {
            "grunt-plato": "~0.2.1",
            "grunt-jsdoc": "~0.4.0",
            "grunt-contrib-watch": "~0.5.3",
            "grunt-concurrent": "~0.3.1",
            "grunt-jasmine-node": "~0.1.0",
            "grunt-jasmine-node-coverage": "~0.1.6",
            "grunt-contrib-jshint": "~0.6.4",
            "grunt-strip": "~0.2.1",
            "grunt": "~0.4.1",
            "grunt-contrib-connect": "~0.5.0",
            "grunt-bump": "0.0.11"
        };

        var files = init.filesToCopy(props);


        //init.addLicenseFiles(files, props.licenses);
        init.copyAndProcess(files,props);
        init.writePackageJSON('package.json',props);

        done();
    });
};