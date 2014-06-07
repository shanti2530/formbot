module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            chromeextension: ['src/chrome-extension/*.js', 'src/*.js', 'chrome-extension/*.js'],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        copy: {
            chromeextension: { 
                files: [
                    {src: 'src/*', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/*.js', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/tidy.css', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/*.json', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
                    {src: 'src/chrome-extension/scripts/*.js', dest: 'gen/chrome-extension/scripts/', flatten: true, expand:true, filter: 'isFile'}
                ]
            },
            chromeextensiondist: {
                files: [
                    {src: 'gen/chrome-extension/fillForms.min.js', dest: 'dist/chrome-extension/scripts/fillForms.min.js'},
                    {src: 'gen/chrome-extension/*.json', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/*.png', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/*.html', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/*.css', dest: 'dist/chrome-extension/', flatten: true, expand: true},
                    {src: 'gen/chrome-extension/background.js', dest: 'dist/chrome-extension/background.js'},
                    {src: 'gen/chrome-extension/options.js', dest: 'dist/chrome-extension/options.js'},
                    {src: 'gen/chrome-extension/scripts/*.js', dest: 'dist/chrome-extension/scripts/', flatten: true, expand: true},
                    {src: 'bower_components/momentjs/min/moment.min.js', dest: 'dist/chrome-extension/scripts/moment.min.js'}
                ]
            }
        },
        includes: {
            chromeextension: {
                src: ["gen/chrome-extension/*.js"],
                dest: "gen/chrome-extension",
                flatten: true
            }
        },
        uglify: {
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
        uncss: {
          chromeextension: {
              files: {
                  'src/chrome-extension/tidy.css': ['src/chrome-extension/options.html']
              }
          }
        },
        processhtml: {
            chromeextension: {
                files: {
                    'gen/chrome-extension/options.html': ['src/chrome-extension/options.html']
                }
            }
        },
        watch: {
            chromeextension: {
                files: ['**/*.js', '**/*.html', '**/*.css', '**/*.json'],
                tasks: ['chromeextensionBuild'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('chromeextensionBuild', ['uncss:chromeextension',
                                                'processhtml:chromeextension',
                                                'copy:chromeextension',
                                                'includes:chromeextension',
                                                'uglify:chromeextension',
                                                'copy:chromeextensiondist',
                                                'jshint:chromeextension']);

    // Default task(s).
    grunt.registerTask('chromeextension', ['chromeextensionBuild','watch:chromeextension']);
};