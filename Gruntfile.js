module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      chromeextension: ['src/chrome-extension/background.js', 'src/fillForms.js'],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    copy: {
      chromeextension: {
        files: [
//          {src: 'bower_components/angular/angular.min.js', dest: 'src/chrome-extension/', flatten: true, expand: true, filter: 'isFile'},
//          {src: 'bower_components/angular-toggle-switch/angular-toggle-switch.min.js', dest: 'src/chrome-extension/', flatten: true, expand: true, filter: 'isFile'},
//          {src: 'bower_components/angular-toggle-switch/*.css', dest: 'src/chrome-extension/', flatten: true, expand: true, filter: 'isFile'},
          {src: 'src/*', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
//          {src: 'src/chrome-extension/angular-toggle-switch-bootstrap.css', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
//          {src: 'src/chrome-extension/angular-toggle-switch.css', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
          {src: 'src/chrome-extension/*.js', dest: 'gen/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
          {src: 'src/chrome-extension/*.json', dest: 'dist/chrome-extension/', flatten: true, expand:true, filter: 'isFile'},
          {src: 'src/chrome-extension/options.css', dest: 'dist/chrome-extension/', flatten: true, expand:true, filter: 'isFile'}
        ]
      },
      chromeextensiondist: {
        files: [
          {src: 'gen/chrome-extension/*.png', dest: 'dist/chrome-extension/', flatten: true, expand: true},
          {src: 'gen/chrome-extension/*.html', dest: 'dist/chrome-extension/', flatten: true, expand: true},
          {src: 'gen/chrome-extension/*.css', dest: 'dist/chrome-extension/', flatten: true, expand: true},
          {src: 'gen/chrome-extension/background.js', dest: 'dist/chrome-extension/background.js'},
          {src: 'gen/chrome-extension/options.js', dest: 'dist/chrome-extension/options.js'},
          {src: 'gen/chrome-extension/optionsController.js', dest: 'dist/chrome-extension/optionsController.js'},
          {src: 'bower_components/angular/angular.min.js', dest: 'dist/chrome-extension/angular.min.js'},
//          {src: 'gen/chrome-extension/angular-toggle-switch.min.js', dest: 'dist/chrome-extension/angular-toggle-switch.min.js'},
//          {src: 'gen/chrome-extension/angular-toggle-switch/*.css', dest: 'dist/chrome-extension/'},
          {src: 'bower_components/momentjs/min/moment.min.js', dest: 'dist/chrome-extension/scripts/moment.min.js'},
          {src: 'node_modules/chance/chance.js', dest: 'dist/chrome-extension/scripts/chance.js'}
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
          'dist/chrome-extension/scripts/fillForms.min.js': ['gen/chrome-extension/fillForms.js']
        }
      },
      options: {
        mangle: false,
        banner: "javascript:"
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
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('build', [
    'copy:chromeextension',
    'processhtml:chromeextension',
    'includes:chromeextension',
    'uglify:chromeextension',
    'copy:chromeextensiondist',
    'jshint:chromeextension']);

  // Default task(s).
  grunt.registerTask('serve', ['build','watch:chromeextension']);
};