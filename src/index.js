import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (fileName) => readFileSync(path.resolve(fileName));

const parseJSON = (file) => JSON.parse(file);

const genDiff = (fileName1, fileName2) => {
  const file1 = parseJSON(readFile(fileName1));
  const file2 = parseJSON(readFile(fileName2));
  const keys = _.keys({ ...file1, ...file2 });
  const sortedKeys = _.sortBy(keys);
  const lines = sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return [` + ${key}: ${file2[key]}`]
    }

    if (file1[key] !== file2[key] && _.has(file1, key) && _.has(file2, key)) {
      return [` - ${key}: ${file1[key]}\n + ${key}: ${file2[key]}`];
    }

    if (file1[key] !== file2[key] && !_.has(file2, key)) {
      return [` - ${key}: ${file1[key]}`];
    }

    if (_.has(file1, key) && _.has(file2, key)) {
      return [`   ${key}: ${file1[key]}`];
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
