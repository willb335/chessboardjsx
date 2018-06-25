module.exports = {
  displayName: 'chessboardjsx',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/src/Chessboard/**/*.js',
    '!**/src/Chessboard/svg/**/*.js',
    '!**/src/Chessboard/ErrorBoundary.js',
    '!**/src/Chessboard/errorMessages.js'
  ],
  moduleFileExtensions: ['js', 'json'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file-mock.js',
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/test/style-mock.js'
  },
  transform: { '^.+\\.js$': 'babel-jest' }
};
