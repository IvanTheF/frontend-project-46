import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getRightAnswer = (rigtAnswerFilename) => fs.readFileSync(getFixturePath(rigtAnswerFilename), 'utf-8').trim();

test('comparing flat json-files', () => {
    const firstPath = getFixturePath('file1.json');
    const secondPath = getFixturePath('file2.json');

    expect(genDiff(firstPath, secondPath)).toEqual(getRightAnswer('rightAnswerJSON.txt'));
});