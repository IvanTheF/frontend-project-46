import _ from 'lodash';
import buildTree from './buildTree.js';
import parser from './parser.js';

const genDiff = (filepath1, filepath2, format) => {
  const parsedData1 = parser(filepath1);
  const parsedData2 = parser(filepath2);

  const data = buildTree(parsedData1, parsedData2);

  const result = data.map((node) => {
    switch (node.status) {
      case 'unchanged': {
        return `${' '} ${node.key}: ${node.value}`;
      }
      case 'changed': {
        return `${'-'} ${node.key}: ${node.oldValue}\n${'+'} ${node.key}: ${node.newValue}`;
      }
      case 'added': {
        return `${'+'} ${node.key}: ${node.value}`;
      }
      case 'delited': {
        return `${'-'} ${node.key}: ${node.value}`;
      }
      default: {
        throw new Error('Unknown status');
      }
    }
  });

  return result.join('\n');
};

export default genDiff;
