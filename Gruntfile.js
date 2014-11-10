// Created by Vladimir G. Mechkauskas <elartix@gmail.com>
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    project: {
      // configurable paths
      app: require('./bower.json').appPath || 'public',
      appName: require('./bower.json').name,
      dist: 'dist'
    },
    watch: {
      styles: {
        files: ['<%= project.app %>/assets/css/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '.tmp/assets/css/{,*/}*.css',
          '{.tmp,<%= project.app %>}/scripts/{,*/}*.js',
          '<%= project.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/css/',
          src: '{,*/}*.css',
          dest: '.tmp/assets/css/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= project.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= project.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= project.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= project.dist %>/*',
            '!<%= project.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= project.app %>/scripts/{,*/}*.js'
      ]
    },
    // not used since Uglify task does concat,
    // but still available if needed
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['<%= project.app %>/scripts/{,*/}*.js'],
        dest: 'dist/scripts/<%= project.appName %>.js'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= project.dist %>/scripts/{,*/}*.js',
            '<%= project.dist %>/assets/css/{,*/}*.css',
            '<%= project.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '!<%= project.dist %>/assets/images/portfolio/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= project.dist %>/assets/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= project.app %>/index.html',
      options: {
        dest: '<%= project.dist %>'
      }
    },
    usemin: {
      html: ['<%= project.dist %>/views/{,*/}*.html','<%= project.dist %>/{,*/}*.html'],
      css: ['<%= project.dist %>/assets/css/{,*/}*.css'],
      options: {
        dirs: ['<%= project.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.app %>/assets/images',
          src: ['**/{,*/}*.{png,jpg,jpeg}'],
          dest: '<%= project.dist %>/assets/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.app %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= project.dist %>/assets/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= project.dist %>/assets/css/main.css': [
      //       '.tmp/assets/css/{,*/}*.css',
      //       '<%= project.app %>/assets/css/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/project/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= project.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= project.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'assets/bower_components/**/*',
            'assets/images/{,*/}*.{gif,webp}',
            'assets/fonts/*',
            'assets/js/*',
            'data/*',
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets/images',
          dest: '<%= project.dist %>/assets/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= project.app %>/assets/css',
        dest: '.tmp/assets/css/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= project.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.dist %>/scripts',
          src: '*.js',
          dest: '<%= project.dist %>/scripts'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= project.appName %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      dist: {
        files: {
          'dist/scripts/<%= project.appName %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('cleanup', [
    'clean:dist',
    'clean:server',
  ]);

  grunt.registerTask('default', [
    'cleanup',
    'build',
  ]);

};
