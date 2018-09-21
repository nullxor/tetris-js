const path = require('path');

module.exports = {
  entry: './tetris/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tetrisbundle.js'
  },
  mode: 'production'
};
