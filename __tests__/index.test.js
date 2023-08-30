import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getRightAnswer = (rigtAnswerFilename) => fs.readFileSync(getFixturePath(rigtAnswerFilename), 'utf-8').trim();

describe.each([
  ['file1.json', 'file2.json', 'rightAnswerStylish.txt', 'rightAnswerPlain.txt', 'rightAnswerJSON.txt'],
  ['file1.yml', 'file2.yml', 'rightAnswerStylish.txt', 'rightAnswerPlain.txt', 'rightAnswerJSON.txt'],
])('Comparing files %s and %s', (firstFile, secondFile, stylishAnswer, plainAnswer, jsonAnswer) => {
  const firstPath = getFixturePath(firstFile);
  const secondPath = getFixturePath(secondFile);

  test.each([
    ['stylish', stylishAnswer],
    ['plain', plainAnswer],
    ['json', jsonAnswer],
  ])('in %s format', (format, answer) => {
    expect(genDiff(firstPath, secondPath, format)).toEqual(getRightAnswer(answer));
  });
});
