@ECHO OFF
ECHO Compiling SCSS
CALL sass ./src/css/sass/:./src/css/out/ --style=compressed
ECHO Compiling TypeScript for Server
CALL tsc
ECHO Compiling TypeScript for Content
call tsc -p tsconfig.browser.json
ECHO Build Complete