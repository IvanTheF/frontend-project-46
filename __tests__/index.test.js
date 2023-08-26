import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getRightAnswer = (rigtAnswerFilename) => fs.readFileSync(getFixturePath(rigtAnswerFilename), 'utf-8').trim();

test('Comparing JSON-files in stylish format', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');

  expect(genDiff(firstPath, secondPath, 'stylish')).toEqual(getRightAnswer('rightAnswerStylish.txt'));
  expect(genDiff(firstPath, secondPath)).toEqual(getRightAnswer('rightAnswerStylish.txt'));
});

test('Comparing YML-files in stylish format', () => {
  const firstPath = getFixturePath('file1.yml');
  const secondPath = getFixturePath('file2.yml');

  expect(genDiff(firstPath, secondPath, 'stylish')).toEqual(getRightAnswer('rightAnswerStylish.txt'));
  expect(genDiff(firstPath, secondPath)).toEqual(getRightAnswer('rightAnswerStylish.txt'));
});

test('Comparing JSON-files in plain format', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');

  expect(genDiff(firstPath, secondPath, 'plain')).toEqual(getRightAnswer('rightAnswerPlain.txt'));
});

test('Comparing YML-files in plain format', () => {
  const firstPath = getFixturePath('file1.yml');
  const secondPath = getFixturePath('file2.yml');

  expect(genDiff(firstPath, secondPath, 'plain')).toEqual(getRightAnswer('rightAnswerPlain.txt'));
});

test('Comparing JSON-files in json format', () => {
  const firstPath = getFixturePath('file1.json');
  const secondPath = getFixturePath('file2.json');

  expect(genDiff(firstPath, secondPath, 'json')).toEqual(getRightAnswer('rightAnswerJSON.txt'));
});

test('Comparing YML-files in json format', () => {
  const firstPath = getFixturePath('file1.yml');
  const secondPath = getFixturePath('file2.yml');

  expect(genDiff(firstPath, secondPath, 'json')).toEqual(getRightAnswer('rightAnswerJSON.txt'));
});
