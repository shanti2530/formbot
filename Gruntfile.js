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
				files: {
					'tmp/fillFormsUglified.js': ['tmp/fillForms.js']
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
            bookmarklet: {
              src: ['bower_components/momentjs/min/moment.min.js', 'tmp/fillFormsUglified.js'],
              dest: 'dest/fillForms.min.js',
            },
          },
		jshint: {
			bookmarklet: ['src/**/*.js'],
            chromeextension: ['chrome-extension/*.js'],
			options: {
				jshintrc: ".jshintrc"
			}
		},
        copy: {
            chromeextension: {
                files: [
                    {src: 'dest/fillForms.min.js', dest: 'chromeextension/scripts/fillForms.min.js'},
                    {src: 'bower_components/momentjs/min/moment.min.js', dest: 'chromeextension/scripts/moment.min.js'}
                ]
            },
        },
        watch: {
            bookmarklet: {
                files: ['**/*.js'],
                tasks: ['jshint:bookmarklet','includes','uglify', 'concat:bookmarklet'],
                options: {
					spawn: false
                },
            },
            chromeextension: {
                files: ['**/*.js'],
                tasks: ['jshint','includes','uglify', 'copy:chromeextension'],
                options: {
                    spawn: false
                },
            }
        },
    });

    // Default task(s).
    grunt.registerTask('bookmarklet', ['watch:bookmarklet']);
    grunt.registerTask('chromeextension', ['watch:chromeextension']);
};