module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            files: {
                'dest/fillForms.min.js': ['src/fillForms.js']
            }
            options: {
                mangle: false,
                banner: "javascript:"
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['uglify'],
                options: {
                spawn: false,
            },
          },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Load the plugin that uploads the minified version of the bookmarklet to a hosting server
    grunt.loadNpmTasks('grunt-ftp-upload');

    //load the plugin that runs predefined tasks whenever a watched file is added, changed or removed.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};