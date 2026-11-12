'use strict';

// Синхронные функции обработки данных (без запросов в сеть)

// Посты: сначала самые длинные заголовки
function orderPostsByTitleDesc(posts) {
  return posts.slice().sort((first, second) => second.title.length - first.title.length);
}

// Комментарии: по алфавиту по полю name
function orderCommentsByName(comments) {
  return comments.slice().sort((first, second) => first.name.localeCompare(second.name));
}

// Пользователи: оставляем только контактные поля
function extractUserContacts(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));
}

// Задачи: только невыполненные
function selectPendingTodos(todos) {
  return todos.filter((item) => item.completed === false);
}

module.exports = {
  orderPostsByTitleDesc,
  orderCommentsByName,
  extractUserContacts,
  selectPendingTodos,
};
