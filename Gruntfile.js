module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['ts/**/*.ts'],
                dest: 'Build/SamuraiCastle.js',
                options: {
                    module: 'amd', //or commonjs
                    sourceMap: false
                }
            }
        },
        less: {
            development: {
                files: {
                    "Build/SamuraiCastle.css": [
                        "less/SamuraiCastle.less"
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['ts/**/*.ts'],
                tasks: ['typescript'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['typescript:base', 'less']);

    grunt.registerTask('start', ['watch']);

};