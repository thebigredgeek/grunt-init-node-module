module.exports = function(grunt){
    var pkg = require('./package.json'), //package file
        i; //iterative member


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump:{
            options:{
                files:[
                    'package.json',
                    'bower.json'
                ],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },
        nodeunit:{
            all:['test/**/*.spec.js']
        },
        connect:{
            server:{
                options:{
                    port: 9001,
                    base:[
                        'docs',
                        'analytics'
                    ],
                    keepalive:true,
                    livereload:true
                }
            }
        },
        concurrent:{
            environment:{
                tasks:["watch","connect"],
                options:{
                    logConcurrentOutput:true
                }
            }
        },
        strip:{
            dist:{
                src:"dist/{%= name %}.js",
                options:{
                    inline:true,
                    nodes:[
                        'console.log',
                        'console.warn',
                        'debug'
                    ]
                }
            }
        },
        plato:{
            report:{
                options:{
                    jshint:false
                },
                files:{
                    "analytics/plato":["src/**/*.js"]
                }
            }
        },
        jshint:{
            options:{
                smarttabs:true,
                unused:false,
                boss:true,
                debug:true
            },
            all:["src/**/*.js"]
        },
        watch:{
            files:[
                "README.md",
                "src/**/*.js",
                "test/**/*.js"
            ],
            tasks:["test"],
            options:{
                livereload:true,
                atBegin:true
            }
        },
        jsdoc:{
            dist:{
                src: [
                    "README.md",
                    "dist/{%= name %}.js"
                ],
                options:{
                    destination: 'docs'
                }
            }
        }

    });

    for(i in pkg.devDependencies){ //iterate through the development dependencies
        if(pkg.devDependencies.hasOwnProperty(i)){ //avoid iteration over inherited object members
            if(i.substr(0,6) == 'grunt-'){ //only load development dependencies that being with "grunt-""
                grunt.loadNpmTasks(i); //load all grunt tasks
            }
        }
    }
    grunt.registerTask('default',["concurrent"]);
    grunt.registerTask('test',['jshint','nodeunit','plato','jsdoc']);
    grunt.registerTask('dist',['jshint','nodeunit','plato','jsdoc','bump']);
};