import _ from 'lodash';
import parser from './parser.js';
import format from './formatters/index.js';

const nodes = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return ['add', { key, val: obj2[key] }];
    }
    if (!_.has(obj2, key)) {
      return ['remove', { key, val: obj1[key] }];
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return ['recursive', { key, val: nodes(obj1[key], obj2[key]) }];
    }
    if (obj1[key] === obj2[key]) {
      return ['equal', { key, val: obj1[key] }];
    }
    return ['updated', { key, val1: obj1[key], val2: obj2[key] }];
  });
};

const genDiff = (fileName1, fileName2, formatType = 'stylish') => {
  const file1 = parser(fileName1);
  const file2 = parser(fileName2);
  const tree = nodes(file1, file2);
  return format(tree, formatType);
};
// genDiff('../__fixtures__/nestedFile1.json', '../__fixtures__/nestedFile2.json');
export default genDiff;
