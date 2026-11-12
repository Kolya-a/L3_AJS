'use strict';

// Асинхронность через Promise (.then / .catch)

const { API_ROOT } = require('./settings');
const { extractUserContacts, selectPendingTodos } = require('./dataTools');
const { printSection } = require('./output');

function requestJsonPromise(path) {
  return fetch(`${API_ROOT}/${path}`).then((reply) => reply.json());
}

function loadUserContacts() {
  return requestJsonPromise('users').then(extractUserContacts);
}

function loadPendingTodos() {
  return requestJsonPromise('todos').then(selectPendingTodos);
}

function runPromiseDemo() {
  return loadUserContacts()
    .then((users) => {
      printSection('[promise] /users', users);
      return loadPendingTodos();
    })
    .then((todos) => {
      printSection('[promise] /todos (completed: false)', todos);
    })
    .catch((error) => console.error('promise:', error.message));
}

module.exports = { runPromiseDemo };
