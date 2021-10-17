import _ from 'lodash';
import { readFileSync } from 'fs';
import json from './parser.js';

const genDiff = (fileName1, fileName2) => {
  const file1 = json(readFileSync(fileName1, 'utf-8'));
  const file2 = json(readFileSync(fileName2, 'utf-8'));
  const keys = _.keys({ ...file1, ...file2 });
  const sortedKeys = _.sortBy(keys);
  const lines = sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return [` +  ${key}: ${file2[key]}`];
    }

    if (file1[key] !== file2[key] && _.has(file1, key) && _.has(file2, key)) {
      return [` -  ${key}: ${file1[key]}\n +  ${key}: ${file2[key]}`];
    }

    if (file1[key] !== file2[key] && !_.has(file2, key)) {
      return [` -  ${key}: ${file1[key]}`];
    }

    if (_.has(file1, key) && _.has(file2, key)) {
      return [`    ${key}: ${file1[key]}`];
    }

    return key;
  });
  return [
    '{',
    ...lines,
    '}',
  ].join('\n');
};

export default genDiff;
