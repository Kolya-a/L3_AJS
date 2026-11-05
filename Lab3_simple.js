'use strict';
const https = require('https');
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const LIMIT = 10; 
function sortPostsByTitleLengthDesc(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}
function sortCommentsByAuthorName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}
function pickUserFields(users) {
  return users.map(({ id, name, username, email, phone }) => ({ id, name, username, email, phone }));
}
function filterNotCompletedTodos(todos) {
  return todos.filter((todo) => !todo.completed);
}
function show(label, data) {
  console.log(`\n===== ${label} (всего: ${data.length}) =====`);
  console.log(JSON.stringify(data.slice(0, LIMIT), null, 2));
}
function getJsonCallback(resource, callback) {
  https
    .get(`${BASE_URL}/${resource}`, (res) => {
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { raw += chunk; });
      res.on('end', () => {
        try {
          callback(null, JSON.parse(raw));
        } catch (err) {
          callback(err);
        }
      });
    })
    .on('error', callback);
}
function getPostsSortedCallback(callback) {
  getJsonCallback('posts', (err, posts) => {
    if (err) return callback(err);
    callback(null, sortPostsByTitleLengthDesc(posts));
  });
}
function getCommentsSortedCallback(callback) {
  getJsonCallback('comments', (err, comments) => {
    if (err) return callback(err);
    callback(null, sortCommentsByAuthorName(comments));
  });
}
function getJsonPromise(resource) {
  return fetch(`${BASE_URL}/${resource}`).then((response) => response.json());
}
function getUsersPickedPromise() {
  return getJsonPromise('users').then(pickUserFields);
}
function getNotCompletedTodosPromise() {
  return getJsonPromise('todos').then(filterNotCompletedTodos);
}
async function getJsonAsync(resource) {
  const response = await fetch(`${BASE_URL}/${resource}`);
  return response.json();
}
async function getPostsSortedAsync() {
  return sortPostsByTitleLengthDesc(await getJsonAsync('posts'));
}
async function getCommentsSortedAsync() {
  return sortCommentsByAuthorName(await getJsonAsync('comments'));
}
async function getUsersPickedAsync() {
  return pickUserFields(await getJsonAsync('users'));
}
async function getNotCompletedTodosAsync() {
  return filterNotCompletedTodos(await getJsonAsync('todos'));
}
let postsCb, commentsCb, usersPr, todosPr, postsAs, commentsAs, usersAs, todosAs;
function runCallbacks(done) {
  getPostsSortedCallback((err, posts) => {
    if (err) return console.error('callback posts:', err.message);
    postsCb = posts;
    show('[callback] /posts по убыванию длины title', postsCb);

    getCommentsSortedCallback((err2, comments) => {
      if (err2) return console.error('callback comments:', err2.message);
      commentsCb = comments;
      show('[callback] /comments по name', commentsCb);
      done();
    });
  });
}
function runPromises() {
  return getUsersPickedPromise()
    .then((users) => {
      usersPr = users;
      show('[promise] /users', usersPr);
      return getNotCompletedTodosPromise();
    })
    .then((todos) => {
      todosPr = todos;
      show('[promise] /todos (completed: false)', todosPr);
    })
    .catch((err) => console.error('promise:', err.message));
}
async function runAsync() {
  try {
    postsAs = await getPostsSortedAsync();
    show('[async] /posts по убыванию длины title', postsAs);

    commentsAs = await getCommentsSortedAsync();
    show('[async] /comments по name', commentsAs);

    usersAs = await getUsersPickedAsync();
    show('[async] /users', usersAs);

    todosAs = await getNotCompletedTodosAsync();
    show('[async] /todos (completed: false)', todosAs);
  } catch (err) {
    console.error('async:', err.message);
  }
}
runCallbacks(() => {
  runPromises().then(runAsync);
});
