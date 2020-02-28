@ECHO OFF
ECHO Compiling SCSS
CALL sass ./src/css/sass/:./src/css/out/ --style=compressed
ECHO Compiling TypeScript
CALL tsc ./src/js/ts/main.ts --outDir ./src/js/out
ECHO Build Complete