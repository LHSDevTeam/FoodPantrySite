set +v
echo Compiling SCSS
sass ./src/css/sass/:./src/css/out/ --style=compressed
echo -n "Compiling TypeScript for Server "
tsc
echo -e '\u2713'
ECHO Compiling TypeScript and Bundling Files for Content
echo -n " Home "
browserify ./src/js/ts/home.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/home.js
echo -e '\u2713'
echo -n " 404 "
browserify ./src/js/ts/404.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/404.js
echo -e '\u2713'
echo -n " Dashboard "
browserify ./src/js/ts/dashboard.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/dashboard.js
echo -e '\u2713'
echo -n " Scanner "
browserify ./src/js/ts/scanner.ts -p [ tsify -p ./tsconfig.browser.json ] > ./src/js/out/scanner.js
echo -e '\u2713'
echo Build Complete