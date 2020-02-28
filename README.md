# FoodPantrySite
[![Build Status](https://travis-ci.com/LHSDevTeam/FoodPantrySite.svg?branch=develop)](https://travis-ci.com/LHSDevTeam/FoodPantrySite)

A website that will record the items that users scan, and allow for health professionals to get insights into their eating habits

---

Plan:
- The website will be hosted on an AWS LightSail server.
- Instead of using LAMP, it will use Node.js, since it will be easier to integrate CI and run server side code.
- It will use [SASS](https://sass-lang.com/) for CSS preprocessing.
- It will use [TypeScript](https://www.typescriptlang.org/) as a JS dialect.
- CI will be via [Travis CI](https://travis-ci.com/LHSDevTeam/FoodPantrySite), allowing for better integration

---

All needed modules can be installed with `npm install`

SCSS and TypeScript can be compiled with `npm run build`

Can be tested with `npm run test`