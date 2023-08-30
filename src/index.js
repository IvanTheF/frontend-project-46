import path from 'path';
import fs from 'fs';
import buildTree from './buildTree.js';
import parser from './parser.js';
import formatDiff from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getType = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileType1 = getType(filepath1);
  const fileType2 = getType(filepath2);
  const absPath1 = getFilePath(filepath1);
  const absPath2 = getFilePath(filepath2);
  const fileData1 = getFileData(absPath1);
  const fileData2 = getFileData(absPath2);
  const parsedData1 = parser(fileData1, fileType1);
  const parsedData2 = parser(fileData2, fileType2);

  return formatDiff(buildTree(parsedData1, parsedData2), format);
};

export default genDiff;
