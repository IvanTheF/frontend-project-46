import _ from 'lodash';

const getSpace = (lvlNest, spacesCount = 4) => ' '.repeat(lvlNest * spacesCount);

const getString = (data, lvlNest) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.keys(data).map((key) => `${getSpace(lvlNest + 1)}${key}: ${getString(data[key], lvlNest + 1)}`);
  return `{\n${lines.join('\n')}\n${getSpace(lvlNest)}}`;
};

const iter = (data, lvlNest) => {
  const result = data.map((node) => {
    switch (node.status) {
      case 'unchanged': {
        return `${getSpace(lvlNest)}    ${node.key}: ${getString(node.value, lvlNest + 1)}`;
      }
      case 'changed': {
        return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.newValue, lvlNest + 1)}\n${getSpace(lvlNest)}  + ${node.key}: ${getString(node.oldValue, lvlNest + 1)}`;
      }
      case 'added': {
        return `${getSpace(lvlNest)}  + ${node.key}: ${getString(node.value, lvlNest + 1)}`;
      }
      case 'deleted': {
        return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.value, lvlNest + 1)}`;
      }
      case 'nested': {
        return `${getSpace(lvlNest + 1)}${node.key}: ${getString(iter(node.children, lvlNest + 1), lvlNest + 1)}`;
      }
      default: {
        throw new Error(`Unknown status: ${node.status}`);
      }
    }
  });

  return `{\n${result.join('\n')}\n${getSpace(lvlNest)}}`;
};

const getStylish = (tree) => iter(tree, 0);

export default getStylish;
