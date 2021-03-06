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
    clean: ['dist/**'],
    copy: {
      build: {
        files: [
          {src: 'bower_components/momentjs/min/moment.min.js', dest: 'src/scripts/moment.min.js'},
          {src: 'node_modules/chance/chance.js', dest: 'src/scripts/chance.js'},
          {src: 'bower_components/angular/angular.min.js', dest: 'src/options/angular.min.js'},
          {src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'src/options/bootstrap.min.css'},
          {src: 'bower_components/font-awesome/css/font-awesome.min.css', dest: 'src/options/font-awesome.min.css'}
        ]
      },

      release: {
        files:[
          {cwd: 'src', src: '**', dest: 'dist/', expand: true},
        ]
      },
    },
    uglify: {
      build: {
        files: {
          'dist/scripts/fillForms.min.js': ['dist/scripts/fillForms.js']
        }
      },
      options: {
        mangle: false,
        banner: "javascript:"
      }
    },

    // chromeManifest: {
    //   dist: {
    //     options: {
    //       buildnumber: 'both',
    //       background: {
    //         target: "scripts/*.js"
    //       }
    //     },
    //     src: 'src',
    //     dest: 'dist'
    //   }
    // },
    compress: {
      dist: {
        options: {
          archive: 'compressed/archive.zip'
        },
        expand: true,
        cwd: 'dist',
        src: ['**/*'],
        dest: ''
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'copy:build',
    'copy:release',
    'uglify:build'
    ]);

  grunt.registerTask('release', [
    //'chromeManifest:dist', 
    'compress:dist']);
};