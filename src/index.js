import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parser from './parser.js';
import format from './formatters/index.js';

const nodes = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { add: { key, value: obj2[key] } };
    }
    if (!_.has(obj2, key)) {
      return { remove: { key, value: obj1[key] } };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { recursive: { key, children: nodes(obj1[key], obj2[key]) } };
    }
    if (obj1[key] === obj2[key]) {
      return { equal: { key, value: obj1[key] } };
    }
    return { updated: { key, beforeValue: obj1[key], afterValue: obj2[key] } };
  });
};

const getFile = (file) => readFileSync(file, 'utf-8');
const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (fileName1, fileName2, formatType = 'stylish') => {
  const file1 = parser(getFile(fileName1), getFormat(fileName1));
  const file2 = parser(getFile(fileName2), getFormat(fileName2));
  const tree = nodes(file1, file2);
  return format(tree, formatType);
};

export default genDiff;
