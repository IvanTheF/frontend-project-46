import path, { format } from 'path';
import fs from 'fs';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getType = (filepath) => path.extname(filepath).slice(1);

const parser = (filepath) => {
  const fileType = getType(filepath);
  const absPath = getFilePath(filepath);
  const fileData = getFileData(absPath);

  if (fileType === 'json') {
    return JSON.parse(fileData);
  }
};

export default parser;
