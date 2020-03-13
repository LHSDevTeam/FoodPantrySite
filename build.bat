@ECHO OFF
@CHCP 65001>NUL
ECHO Compiling SCSS
CALL sass ./src/css/sass/:./src/css/out/ --style=compressed
ECHO | SET /p="Compiling TypeScript for Server "
CALL tsc
ECHO √
ECHO Compiling TypeScript and Bundling Files for Content
ECHO | SET /p=" Home "
CALL browserify ./src/js/ts/home.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/home.js
ECHO √
ECHO | SET /p=" 404 "
CALL browserify ./src/js/ts/404.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/404.js
ECHO √
ECHO | SET /p=" Dashboard "
CALL browserify ./src/js/ts/dashboard.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/dashboard.js
ECHO √
ECHO | SET /p=" Scanner "
CALL browserify ./src/js/ts/scanner.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/scanner.js
ECHO √
ECHO Build Complete