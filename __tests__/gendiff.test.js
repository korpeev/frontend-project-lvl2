import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathFixture = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getPathFixture(fileName), 'utf-8');

test('foramt type flatten json diffs', () => {
  const result = readFile('expect.txt');
  const file1 = getPathFixture('file1.json');
  const file2 = getPathFixture('file2.json');
  expect(genDiff(file1, file2)).toBe(result);
});

test('format type flatten yaml diffs', () => {
  const result = readFile('expect.txt');
  const file1 = getPathFixture('file1.yaml');
  const file2 = getPathFixture('file2.yaml');
  expect(genDiff(file1, file2)).toBe(result);
});

test('format type nested yaml diffs', () => {
  const result = readFile('expectNested.txt');
  const nestedFile1 = getPathFixture('nestedFile1.yaml');
  const nesteedFile2 = getPathFixture('nestedFile2.yaml');
  expect(genDiff(nestedFile1, nesteedFile2)).toBe(result);
});

test('format type nested json diffs', () => {
  const result = readFile('expectNested.txt');
  const nestedFile1 = getPathFixture('nestedFile1.json');
  const nesteedFile2 = getPathFixture('nestedFile2.json');
  expect(genDiff(nestedFile1, nesteedFile2)).toBe(result);
});

test('format type plain json diffs', () => {
  const result = readFile('expectPlain.txt');
  const plainFile1 = getPathFixture('nestedFile1.json');
  const plainFile2 = getPathFixture('nestedFile2.json');
  expect(genDiff(plainFile1, plainFile2, 'plain')).toBe(result);
});

test('format type plain yaml diffs', () => {
  const result = readFile('expectPlain.txt');
  const plainFile1 = getPathFixture('nestedFile1.yaml');
  const plainFile2 = getPathFixture('nestedFile2.yaml');
  expect(genDiff(plainFile1, plainFile2, 'plain')).toBe(result);
});

test('format type JSON json diffs', () => {
  const result = readFile('expectJson.txt');
  const file1 = getPathFixture('nestedFile1.json');
  const file2 = getPathFixture('nestedFile2.json');
  expect(genDiff(file1, file2, 'json')).toBe(result);
});

test('format type JSON Yaml diffs', () => {
  const result = readFile('expectJson.txt');
  const file1 = getPathFixture('nestedFile1.yaml');
  const file2 = getPathFixture('nestedFile2.yaml');
  expect(genDiff(file1, file2, 'json')).toBe(result);
});
