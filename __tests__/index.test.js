import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getRightAnswer = (rigtAnswerFilename) => fs.readFileSync(getFixturePath(rigtAnswerFilename), 'utf-8').trim();

test('comparing json-files in stylish format', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');

  expect(genDiff(firstPath, secondPath, 'stylish')).toEqual(getRightAnswer('rightAnswerStylish.txt'));
  expect(genDiff(firstPath, secondPath)).toEqual(getRightAnswer('rightAnswerStylish.txt'));
});

test('comparing yml-files in stylish format', () => {
  const firstPath = getFixturePath('file1.yml');
  const secondPath = getFixturePath('file2.yml');

  expect(genDiff(firstPath, secondPath, 'stylish')).toEqual(getRightAnswer('rightAnswerStylish.txt'));
  expect(genDiff(firstPath, secondPath)).toEqual(getRightAnswer('rightAnswerStylish.txt'));
});

test('comparing json-files in plain format', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');

  expect(genDiff(firstPath, secondPath, 'plain')).toEqual(getRightAnswer('rightAnswerPlain.txt'));
});

test('comparing yml-files in plain format', () => {
  const firstPath = getFixturePath('file1.yml');
  const secondPath = getFixturePath('file2.yml');

  expect(genDiff(firstPath, secondPath, 'plain')).toEqual(getRightAnswer('rightAnswerPlain.txt'));
});
