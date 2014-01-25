module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            bookmarklet: ['src/bookmarklet/*.js', 'src/*.js'],
            chromeextension: ['src/chrome-extension/*.js', 'src/*.js', 'chrome-extension/*.js'],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        copy: {
            bookmarklet: { 
                files: [
                    {src: 'src/*.js', dest: 'gen/bookmarklet/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/bookmarklet/*.js', dest: 'gen/bookmarklet/', flatten: true, expand:true, filter: 'isFile'}
                ]
            },
            chromeextension: { 
                files: [
                    {src: 'src/*.js', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/*.*', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/scripts/*.js', dest: 'gen/chrome-extension/scripts/', flatten: true, expand:true, filter: 'isFile'}
                ]
            },
            bookmarkletdist: {
                files: [
                    {src: 'gen/bookmarklet/fillForms.min.js', dest: 'dist/bookmarklet/fillForms.min.js'}
                ]
            },
            chromeextensiondist: {
                files: [
                    {src: 'gen/chrome-extension/fillForms.min.js', dest: 'dist/chrome-extension/scripts/fillForms.min.js'},
                    {src: 'gen/chrome-extension/*.html', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/*.json', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/*.css', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/background.js', dest: 'dist/chrome-extension/background.js'},
                    {src: 'gen/chrome-extension/options.js', dest: 'dist/chrome-extension/options.js'},
                    {src: 'gen/chrome-extension/scripts/*.js', dest: 'dist/chrome-extension/scripts/', flatten: true, expand: true},
                    {src: 'bower_components/momentjs/min/moment.min.js', dest: 'dist/chrome-extension/scripts/moment.min.js'}
                ]
            }
        },
        includes: {
            bookmarklet: {
                src: ["gen/bookmarklet/*.js"],
                dest: "gen/bookmarklet",
                flatten: true
            },
            chromeextension: {
                src: ["gen/chrome-extension/*.js"],
                dest: "gen/chrome-extension",
                flatten: true
            }
        },
        uglify: {
			bookmarklet:{
                files: {
    				'gen/bookmarklet/fillForms.min.js': ['bower_components/momentjs/min/moment.min.js','gen/bookmarklet/fillForms.js']
    			}
            },
            chromeextension: {
                files: {
                    'gen/chrome-extension/fillForms.min.js': ['gen/chrome-extension/fillForms.js']
                }
            },
            options: {
                mangle: false,
                banner: "javascript:"
            }
        },
        watch: {
            bookmarklet: {
                files: ['**/*.js'],
                tasks: ['copy:bookmarklet', 
                        'includes:bookmarklet', 
                        'uglify:bookmarklet', 
                        'copy:bookmarkletdist', 
                        'jshint:bookmarklet'],
                options: {
                    spawn: false
                },
            },
            chromeextension: {
                files: ['**/*.js', '**/*.html', '**/*.css'],
                tasks: ['copy:chromeextension', 
                        'includes:chromeextension', 
                        'uglify:chromeextension', 
                        'copy:chromeextensiondist', 
                        'jshint:chromeextension'],
                options: {
                    spawn: false
                },
            },
        }
    });

    // Default task(s).
    grunt.registerTask('bookmarklet', ['watch:bookmarklet']);
    grunt.registerTask('chromeextension', ['watch:chromeextension']);
};