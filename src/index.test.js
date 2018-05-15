const grandmasterNames = require('./index');

function isArrayOfStrings(array) {
  return array.every(i => typeof i === 'string');
}

function isIncludedIn(array, item) {
  return array.includes(item);
}

describe('grandmaster-names', () => {
  it('should have a list of all available names', () => {
    expect(isArrayOfStrings(grandmasterNames.all)).toBe(true);
  });

  it('should allow me to get a random name from the list', () => {
    expect(isIncludedIn(grandmasterNames.all, grandmasterNames.random())).toBe(true);
  });
});
