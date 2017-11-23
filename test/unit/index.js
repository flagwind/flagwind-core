// import Promise from "es6-promise";
// Promise.polyfill();

const testsContext = require.context("./specs", true, /\.spec$/);
testsContext.keys().forEach(testsContext);