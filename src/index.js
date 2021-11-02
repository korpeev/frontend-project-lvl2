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
      return { status: 'added', key, value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { status: 'removed', key, value: obj1[key] };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { status: 'recursive', key, children: nodes(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { status: 'equal', key, value: obj1[key] };
    }
    return {
      status: 'updated', key, beforeValue: obj1[key], afterValue: obj2[key],
    };
  });
};

const getContent = (file) => readFileSync(file, 'utf-8');
const getFormat = (file) => path.extname(file).slice(1);

const genDiff = (fileName1, fileName2, formatType = 'stylish') => {
  const file1 = parser(getContent(fileName1), getFormat(fileName1));
  const file2 = parser(getContent(fileName2), getFormat(fileName2));
  const tree = nodes(file1, file2);
  console.log(tree)
  return format(tree, formatType);
};

export default genDiff;
