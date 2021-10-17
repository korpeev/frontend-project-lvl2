import _ from 'lodash';
import format from './parser.js';

const nodes = (obj1, obj2) => {
  const keys = _.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  const lines = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return [` +  ${key}: ${obj2[key]}`];
    }

    if (obj1[key] !== obj2[key] && _.has(obj2, key)) {
      return [` -  ${key}: ${obj1[key]}\n +  ${key}: ${obj2[key]}`];
    }

    if (obj1[key] !== obj2[key] && !_.has(obj2, key)) {
      return [` -  ${key}: ${obj1[key]}`];
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      return [`    ${key}: ${obj1[key]}`];
    }

    return key;
  });
  return [
    '{',
    ...lines,
    '}',
  ].join('\n');
};

const genDiff = (fileName1, fileName2) => {
  const file1 = format(fileName1);
  const file2 = format(fileName2);
  return nodes(file1, file2);
};

export default genDiff;
