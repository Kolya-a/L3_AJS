'use strict';
function orderPostsByTitleDesc(posts) {
  return posts.slice().sort((first, second) => second.title.length - first.title.length);
}

function orderCommentsByName(comments) {
  return comments.slice().sort((first, second) => first.name.localeCompare(second.name));
}
function extractUserContacts(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));
}

function selectPendingTodos(todos) {
  return todos.filter((item) => item.completed === false);
}

module.exports = {
  orderPostsByTitleDesc,
  orderCommentsByName,
  extractUserContacts,
  selectPendingTodos,
};
