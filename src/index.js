const uniqueRandomArray = require('unique-random-array');
const chessGrandmasterNames = require('./grandmaster-names.json');


const mainExport = {
  all: chessGrandmasterNames,
  random: uniqueRandomArray(chessGrandmasterNames),
};

// export default mainExport;
module.exports = mainExport; // for CommonJS compatibility
