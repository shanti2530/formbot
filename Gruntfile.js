module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        includes: {
            bookmarklet: {
                src: ["src/fillForms.js"],
                dest: "tmp",
                flatten: true,
                options: {includePath: 'src/assets/bookmarklet'}
            },
            chromeextension: {
                src: ["src/fillForms.js"],
                dest: "tmp",
                flatten: true,
                options: {includePath: 'src/assets/chrome-extension'}
            }
        },
        uglify: {
			my_target:{
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
            bookmarklet: {
                src: ['bower_components/momentjs/min/moment.min.js', 'tmp/fillFormsUglified.js'],
                dest: 'dest/fillForms.min.js'
            },
            chromeextension: {
                src: ['tmp/fillFormsUglified.js'],
                dest: 'dest/fillForms.min.js'
            }
          },
		jshint: {
			bookmarklet: ['src/**/*.js'],
            chromeextension: ['chrome-extension/*.js'],
			options: {
				jshintrc: ".jshintrc"
			}
		},
        copy: {
            init: {
                files: [
                    {src: 'src/assets/utils.js', dest: 'src/assets/chrome-extension/utils.js'},
                    {src: 'src/assets/utils.js', dest: 'src/assets/bookmarklet/utils.js'}
                ]
            },
            chromeextension: {
                files: [
                    {src: 'tmp/fillFormsUglified.js', dest: 'chrome-extension/scripts/fillForms.min.js'},
                    {src: 'bower_components/momentjs/min/moment.min.js', dest: 'chrome-extension/scripts/moment.min.js'}
                ]
            }
        },
        watch: {
            bookmarklet: {
                files: ['**/*.js'],
                tasks: ['jshint:bookmarklet', 'copy:init', 'includes:bookmarklet','uglify', 'concat:bookmarklet'],
                options: {
					spawn: false
                },
            },
            chromeextension: {
                files: ['**/*.js'],
                tasks: ['jshint','copy:init', 'includes:chromeextension','uglify', 'copy:chromeextension'],
                options: {
                    spawn: false
                },
            }
        }
    });

    // Default task(s).
    grunt.registerTask('bookmarklet', ['watch:bookmarklet']);
    grunt.registerTask('chromeextension', ['watch:chromeextension']);
};