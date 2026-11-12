'use strict';

// Асинхронность через колбэки (модуль https)

const https = require('https');
const { API_ROOT } = require('./settings');
const { orderPostsByTitleDesc, orderCommentsByName } = require('./dataTools');
const { printSection } = require('./output');

function requestJson(path, done) {
  const request = https.get(`${API_ROOT}/${path}`, (response) => {
    let body = '';
    response.setEncoding('utf8');
    response.on('data', (part) => {
      body += part;
    });
    response.on('end', () => {
      try {
        done(null, JSON.parse(body));
      } catch (parseError) {
        done(parseError);
      }
    });
  });
  request.on('error', done);
}

function loadOrderedPosts(done) {
  requestJson('posts', (error, posts) => {
    if (error) return done(error);
    done(null, orderPostsByTitleDesc(posts));
  });
}

function loadOrderedComments(done) {
  requestJson('comments', (error, comments) => {
    if (error) return done(error);
    done(null, orderCommentsByName(comments));
  });
}

function runCallbackDemo(onFinish) {
  loadOrderedPosts((postsError, posts) => {
    if (postsError) {
      console.error('callback posts:', postsError.message);
      return onFinish();
    }
    printSection('[callback] /posts по убыванию длины title', posts);

    loadOrderedComments((commentsError, comments) => {
      if (commentsError) {
        console.error('callback comments:', commentsError.message);
        return onFinish();
      }
      printSection('[callback] /comments по name', comments);
      onFinish();
    });
  });
}

module.exports = { runCallbackDemo };
