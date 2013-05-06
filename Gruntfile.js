/*
 * grunt-minispade
 * https://github.com/stevekane/grunt-minispade
 *
 * Copyright (c) 2013 Steven Kane
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    minispade: {
      generateOutput: {
        files: {
          'tmp/generate_output': ['test/fixtures/input.js'],
        },
      },
      useStrict: {
        options: {
          useStrict:true,
        },
        files: {
          'tmp/use_strict': ['test/fixtures/input.js'],
        },
      },
      compileString:{
        options: {
          stringModule: true,
        },
        files: {
          'tmp/compile_string': ['test/fixtures/input.js'],
        },
      },
      moduleIdGenerator: {
        options: {
          moduleIdGenerator: function(filename){
            return 'octopus';
          },
        },
        files: {
          'tmp/module_id_generator' : ['test/fixtures/input.js'],
        }
      },
      rewritesRequires: {
        options: {
          renameRequire:true
        },
        files: {
          'tmp/rewrite_requires' : ['test/fixtures/requires.js']
        }
      },
      rewritesRequiresSpace: {
        options: {
          renameRequire:true
        },
        files: {
          'tmp/rewrite_requires_space' : ['test/fixtures/requires_space.js']
        }
      },
      rewritesRequiresAll: {
        options: {
          renameRequire:true
        },
        files: {
          'tmp/rewrite_requires_all' : ['test/fixtures/requires_all.js']
        }
      },
      rewritesRequiresAllSpace: {
        options: {
          renameRequire:true
        },
        files: {
          'tmp/rewrite_requires_all_space' : ['test/fixtures/requires_all_space.js']
        }
      },


    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'minispade', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
