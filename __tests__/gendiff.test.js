import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathFixture = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getPathFixture(fileName), 'utf-8');

test('test flatten JSON diffs', () => {
  const result = readFile('expect.txt');
  const file1 = getPathFixture('file1.json');
  const file2 = getPathFixture('file2.json');
  expect(genDiff(file1, file2)).toBe(result);
});

test('test flatten Yaml diffs', () => {
  const result = readFile('expect.txt');
  const file1 = getPathFixture('file1.yaml');
  const file2 = getPathFixture('file2.yaml');
  expect(genDiff(file1, file2)).toBe(result);
});

test('test nested Yaml diffs', () => {
  const result = readFile('expectNested.txt');
  const nestedFile1 = getPathFixture('nestedFile1.yaml');
  const nesteedFile2 = getPathFixture('nestedFile2.yaml');
  expect(genDiff(nestedFile1, nesteedFile2)).toBe(result);
});

test('test nested Json diffs', () => {
  const result = readFile('expectNested.txt');
  const nestedFile1 = getPathFixture('nestedFile1.json');
  const nesteedFile2 = getPathFixture('nestedFile2.json');
  expect(genDiff(nestedFile1, nesteedFile2)).toBe(result);
});
