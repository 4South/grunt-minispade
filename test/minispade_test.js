'use strict';

var grunt = require('grunt');

function readFile(file) {
  var contents = grunt.file.read(file);
  if (process.platform === 'win32') {
    contents = contents.replace(/\r\n/g, '\n');
  }
  return contents;
}

function assertFileEquality(test, testName, message) {
  var actual = readFile('tmp/' + testName );
  var expected = readFile('test/expected/' + testName);
  test.equal(expected, actual, message);
}

var allTests = [
  {name: 'generate_output', desc: "Should generate output"},
  {name: 'use_strict', desc: 'Should generate output with Strict'},
  {name: 'compile_string', desc: 'Should compile into string template'},
  {name: 'module_id_generator', desc: 'Should take a module ID generator to name the module'},
  {name: 'rewrite_requires', desc: 'Should rewrite requires'},
  {name: 'rewrite_requires_space', desc: 'Should rewrite requires even with space wrapped tokens'},
  {name: 'rewrite_requires_all', desc: 'Should rewrite requiresAll'},
  {name: 'rewrite_requires_all_space', desc: 'Should rewrite requiresAll even with space wrapped tokens'},
];

exports.minispade = {
  runTests: function(test){
    test.expect(allTests.length);
    allTests.forEach(function(testSpec){
      assertFileEquality(test, testSpec.name, testSpec.desc);
    });
    test.done();
  }
};
