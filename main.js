'use strict';

// Точка входа: запускаем три подхода по очереди
// Запуск: node main.js  (нужен Node.js 18+ из-за fetch)

const { runCallbackDemo } = require('./callbackStyle');
const { runPromiseDemo } = require('./promiseStyle');
const { runAsyncAwaitDemo } = require('./asyncAwaitStyle');

runCallbackDemo(() => {
  runPromiseDemo().then(runAsyncAwaitDemo);
});
