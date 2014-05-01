# grunt-minispade
wraps .js files in [minispade](https://github.com/wycats/minispade) closures for use with minispade.js



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-minispade --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-minispade');
```

## The "minispade" task

### Overview
In your project's Gruntfile, add a section named `minispade` to the data object passed into `grunt.initConfig()`.<br />
You will probably want to use the syntax of "src-dest" shown below in most cases as you are typically going to be wrapping many files in minispade closures and then concatenating them all into one output source file.
```js
grunt.initConfig({
  minispade: {
    options: {
      // Task-specific options go here.
    },
    files: {
      src: ['whereMyFilesAre/*.js'],
      dest: 'outputFile.js',
    },
  },
})
```
#### Default Options
Choose a separator character to place between concatenated files.  This feature is left in as a courtesy to other grunt plugins' formats but it's not particularly useful here and should be left alone in most cases.
```js
grunt.initConfig({
  minispade: {
    options: {
      separator: "",
    },
    files: {
      //file stuff
    },
  },
})
```

#### Custom Options
`renameRequire` If your source files use "require" or "requireAll" you should consider enabling this flag. Once enabled grunt-minispade will automaticly find and replace all calls to these functions with the appropriate equivalents ("minispade.require" and "minispade.requireAll").<br />

`useStrict` Adds JavaScript's 'use strict' inside each registered minispade closure.<br />

`prefixToRemove` If source files come from a directory structure that doesn't match the structure your require statements use to find those modules, you may need to specific a string here that will be removed from all "minispade.register" closures.<br />

`removeFileExtension` Boolean value that decides if the file extension should be included in the output name. Defaults to true.

`moduleIdGenerator` A function which takes one argument that is the path name of the file and returns the name of the minispade module. If this option is set, the `prefixToRemove` option is ignored to avoid collision

`stringModule` If set to true, the output will be a string rather than a closure and a #sourceURL will be appended for easier debugging


e.g  If your javascript files are first compiled from coffeescript they may be outputted in a directory called "compiledJS".  Your register statements thus need to have "compiledJS/" removed from them in order for your requires to find them.
```js
grunt.initConfig({
  minispade: {
    options: {
      renameRequire: true,
      useStrict: true,
      prefixToRemove: "",
    },
    files: {
      //file stuff
    },
  },
})
```

## Contributing
To contribute, contact @stv_kn or email kanesteven@gmail.com or skane@4-south.com.  Alternatively, create a fork and pull request on github.

## Release History
0.1.0 March 12, 2013 initial release
