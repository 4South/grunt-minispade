/*
 * grunt-minispade
 * https://github.com/stevekane/grunt-minispade
 *
 * Copyright (c) 2013 Steven Kane
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  //used to parse filepaths for filenaming options
  var path = require('path');
    
  var formatMinispade = function(srcFile, options) {
    var ext = path.extname(srcFile);
    var fileName = path.basename(srcFile); 
    var contents;

    //OPTIONS HANDLING

    //remove unwanted prefix from minispade registers
    if (options.prefixToRemove !== "") {
      fileName = fileName.replace(options.prefixToRemove, '');
    }
    
    //only .js files may be minispadificated
    if (ext !== '.js') {
      grunt.log.error('minispade may only be run on .js files');
    } else {
      contents = grunt.file.read(srcFile);
      //minispade actually uses the syntax "minispade.require", renames if needed
      if (options.renameRequire === true) {
        contents = contents.replace(/^\s*require\s*\(\s*/g, "minispade.require(");
        contents = contents.replace(/^\s*requireAll\s*\(\s*/g, "minispade.requireAll("); 
      } 
      //insert 'use strict' inside the minispade register if needed
      if (options.useStrict === true) {
        contents = "'use strict';\n" + contents;
      }

      //END OPTIONS HANDLING

      contents = "minispade.register('"+fileName+"', function() {\n"+contents+"});\n";
      grunt.log.writeln(fileName+" minispaded."); 
      return contents;
    }
  };
  grunt.registerMultiTask('minispade', 'wrap files in minispade closures', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      renameRequire: false,
      useStrict: false,
      prefixToRemove: "",
      separator: grunt.util.linefeed
    });
    
    grunt.verbose.writeflags(options, 'Options');
    
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return formatMinispade(filepath, options);
      }).join(grunt.util.normalizelf(options.separator));

      if (src.length < 1) {
        grunt.log.warn('Destination not written,  compiled files were empty.');
      } else {
        grunt.file.write(f.dest, src);
        grunt.log.writeln('File ' + f.dest + ' created.'); 
      }
    });
  });
  
};
