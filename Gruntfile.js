module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
				files: {
					'dest/fillFormsBuilder.min.js': ['src/fillForms.js']
				}
			},
            options: {
                mangle: false,
                banner: "javascript:"
            }
        },
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: ['bower_components/momentjs/min/moment.min.js', 'dest/fillFormsBuilder.min.js'],
              dest: 'dest/fillForms.min.js',
            },
          },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['uglify', 'concat'],
                options: {
                spawn: false,
            },
          },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    //load the plugin that runs predefined tasks whenever a watched file is added, changed or removed.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};