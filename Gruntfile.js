module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        includes: {
            files: {
                src: ["src/fillForms.js"],
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
              dest: 'dest/fillForms.min.js',
            },
          },
		jshint: {
			all: ['src/**/*.js'],
			options: {
				jshintrc: ".jshintrc"
			}
		},
        copy: {
            extension: {
                src: 'dest/fillForms.min.js',
                dest: 'chrome-extension/fillForms.min.js',
            },
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint','includes','uglify', 'concat', 'copy'],
                options: {
					spawn: false
            },
          },
        },
    });

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};