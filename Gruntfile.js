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
    clean: ['dist/**', 'src/options/css/fonts/*', 'src/options/css/vendor/*', 'src/options/js/vendor/*'],
    copy: {
      build: {
        files: [
          {src: 'bower_components/momentjs/min/moment.min.js', dest: 'src/scripts/moment.min.js'},
          {src: 'node_modules/chance/chance.js', dest: 'src/scripts/chance.js'},

          {src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'src/options/js/vendor/bootstrap.min.js'},
          {src: 'bower_components/angular/angular.min.js', dest: 'src/options/js/vendor/angular.min.js'},
          {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'src/options/js/vendor/jquery.min.js'},
          {src: 'bower_components/ng-tags-input/ng-tags-input.min.js', dest: 'src/options/js/vendor/ng-tags-input.min.js'},
          {src: 'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.js', dest: 'src/options/js/vendor/angular-bootstrap-switch.min.js'},

          {src: 'bower_components/bootstrap/dist/css/bootstrap.min.css', dest: 'src/options/css/vendor/bootstrap.min.css'},
          {src: 'bower_components/font-awesome/css/font-awesome.min.css', dest: 'src/options/css/vendor/font-awesome.min.css'},
          {src: 'bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css', dest: 'src/options/css/vendor/bootstrap-switch.min.css'},
          {src: 'bower_components/ng-tags-input/ng-tags-input.min.css', dest: 'src/options/css/vendor/ng-tags-input.min.css'},

          {cwd:"bower_components/font-awesome/fonts", src: '*', dest: 'src/options/css/fonts/', expand:true},
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