import buildTree from './buildTree.js';
import parser from './parser.js';
import formatDiff from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedData1 = parser(filepath1);
  const parsedData2 = parser(filepath2);

  return formatDiff(buildTree(parsedData1, parsedData2), format);
};

export default genDiff;
