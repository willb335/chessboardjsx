const uniqueRandomArray = require('unique-random-array');
const chessGrandmasterNames = require('./grandmaster-names.json');


const mainExporter = {
  all: chessGrandmasterNames,
  random: uniqueRandomArray(chessGrandmasterNames),
};

// export default mainExport;
module.exports = mainExporter; // for CommonJS compatibility
