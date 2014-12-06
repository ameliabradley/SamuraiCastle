module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['ts/SamuraiCastle/**/*.ts'],
                dest: 'Build/SamuraiCastle.js',
                options: {
                    module: 'amd' //or commonjs
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['typescript:base']);

};