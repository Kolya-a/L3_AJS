'use strict';

const { PREVIEW_COUNT } = require('./settings');

// Красивый вывод первых N элементов массива
function printSection(title, items) {
  console.log(`\n===== ${title} (всего: ${items.length}) =====`);
  console.log(JSON.stringify(items.slice(0, PREVIEW_COUNT), null, 2));
}

module.exports = { printSection };
