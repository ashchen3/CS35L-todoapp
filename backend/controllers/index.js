const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const ctrlers = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const ctrler = require(path.join(__dirname, file));
    ctrlers[file.charAt(0).toUpperCase() + file.slice(1, -3)] = ctrler;
  });

module.exports = ctrlers;