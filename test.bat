@ECHO OFF
ECHO Running JSHint
CALL jshint ./src/js/out/main.js
ECHO Running Mocha + Chai
CALL mocha