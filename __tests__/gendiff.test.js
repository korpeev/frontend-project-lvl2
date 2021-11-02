import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathFixture = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getPathFixture(fileName), 'utf-8');
const formats = ['yaml', 'json'];
test.each(formats)('gendiff -format stylish, file format type %s', (type) => {
  const result = readFile('expectNested.txt');
  const nestedFile1 = getPathFixture(`nestedFile1.${type}`);
  const nesteedFile2 = getPathFixture(`nestedFile2.${type}`);
  expect(genDiff(nestedFile1, nesteedFile2)).toBe(result);
});

test.each(formats)('gendiff -format plain, file format type %s', (type) => {
  const result = readFile('expectPlain.txt');
  const nestedFile1 = getPathFixture(`nestedFile1.${type}`);
  const nesteedFile2 = getPathFixture(`nestedFile2.${type}`);
  expect(genDiff(nestedFile1, nesteedFile2, 'plain')).toBe(result);
});

test.each(formats)('gendiff -format json, file format type %s', (type) => {
  const result = readFile('expectJson.txt');
  const nestedFile1 = getPathFixture(`nestedFile1.${type}`);
  const nesteedFile2 = getPathFixture(`nestedFile2.${type}`);
  expect(genDiff(nestedFile1, nesteedFile2, 'json')).toBe(result);
});
