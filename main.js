'use strict';
const { runCallbackDemo } = require('./callbackStyle');
const { runPromiseDemo } = require('./promiseStyle');
const { runAsyncAwaitDemo } = require('./asyncAwaitStyle');

runCallbackDemo(() => {
  runPromiseDemo().then(runAsyncAwaitDemo);
});
