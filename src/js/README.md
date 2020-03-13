# TypeScript Directory
The way the project is structured allows for node modules to be used in the browser via Browserfy.\
Browserfy bundles modules into the distributed file.\
Main.ts is the only file that is not bundled, since `require` can work in node.js files.

Notes to help in development:
* Use the format `let example = require('example');` to import files
* You can define your own modules using `module.exports = function() {}` or `module.exports.value = 555`; it can be accessed using `let example = require('./_example.ts')` or `let value = require('./_example').value`. To distinguish between modules and source files, please append an underscore in modules file names such as `_example.ts`
* Make sure your file is in `build.bat` in the format\
`ECHO | SET /p=" Example "`\
`CALL browserify ./src/js/ts/example.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/example.js`\
`ECHO √`\
At least until this step can be automated by building everything but the main.ts and files that start with an underscore (user defined modules)
