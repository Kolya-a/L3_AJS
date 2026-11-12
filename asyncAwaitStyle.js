'use strict';

// Асинхронность через async / await

const { API_ROOT } = require('./settings');
const {
  orderPostsByTitleDesc,
  orderCommentsByName,
  extractUserContacts,
  selectPendingTodos,
} = require('./dataTools');
const { printSection } = require('./output');

async function requestJsonAwait(path) {
  const reply = await fetch(`${API_ROOT}/${path}`);
  return reply.json();
}

async function runAsyncAwaitDemo() {
  try {
    const posts = orderPostsByTitleDesc(await requestJsonAwait('posts'));
    printSection('[async] /posts по убыванию длины title', posts);

    const comments = orderCommentsByName(await requestJsonAwait('comments'));
    printSection('[async] /comments по name', comments);

    const users = extractUserContacts(await requestJsonAwait('users'));
    printSection('[async] /users', users);

    const todos = selectPendingTodos(await requestJsonAwait('todos'));
    printSection('[async] /todos (completed: false)', todos);
  } catch (error) {
    console.error('async:', error.message);
  }
}

module.exports = { runAsyncAwaitDemo };
