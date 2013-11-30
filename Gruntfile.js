module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        includes: {
            files: {
                src: ["src/fillForms.js", "src/assets/utils.js"],
                dest: "tmp",
                flatten: true
            }
        },
        uglify: {
            my_target: {
				files: {
					'tmp/fillFormsUglified.js': ['tmp/fillForms.js']
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
              src: ['bower_components/momentjs/min/moment.min.js', 'tmp/fillFormsUglified.js'],
              // src: ['tmp/fillFormsUglified.js'],
              dest: 'dest/fillForms.min.js',
            },
          },
        watch: {
            scripts: {
                files: ['**/*.js'],
                // tasks: ['includes'],
                tasks: ['includes','uglify', 'concat'],
                options: {
                spawn: false,
            },
          },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    //adds the possiblity to include files in other files
    grunt.loadNpmTasks('grunt-includes');

    //load the plugin that runs predefined tasks whenever a watched file is added, changed or removed.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};