import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getType = (filepath) => path.extname(filepath).slice(1);

const parser = (filepath) => {
  const fileType = getType(filepath);
  const absPath = getFilePath(filepath);
  const fileData = getFileData(absPath);

  switch (fileType) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
    case 'yaml':
      return yaml.load(fileData);
    default:
      throw new Error('Unknown format');  
  }
};

export default parser;
