import _ from 'lodash';

const getSpace = (lvlNest, spacesCount = 4) => ' '.repeat(lvlNest * spacesCount);

const getString = (data, lvlNest) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.keys(data).map((key) => `${getSpace(lvlNest + 1)}${key}: ${getString(data[key], lvlNest + 1)}`);
  return `{\n${lines.join('\n')}\n${getSpace(lvlNest)}}`;
};

const getStylish = (tree) => {
  const iter = (data, lvlNest) => {
    const result = data.map((node) => {
      const nextLvlNest = lvlNest + 1;
      switch (node.status) {
        case 'unchanged': {
          return `${getSpace(lvlNest)}    ${node.key}: ${getString(node.value, nextLvlNest)}`;
        }
        case 'changed': {
          return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.newValue, nextLvlNest)}\n${getSpace(lvlNest)}  + ${node.key}: ${getString(node.oldValue, nextLvlNest)}`;
        }
        case 'added': {
          return `${getSpace(lvlNest)}  + ${node.key}: ${getString(node.value, nextLvlNest)}`;
        }
        case 'deleted': {
          return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.value, nextLvlNest)}`;
        }
        case 'nested': {
          return `${getSpace(nextLvlNest)}${node.key}: ${getString(iter(node.children, nextLvlNest), nextLvlNest)}`;
        }
        default: {
          throw new Error(`Unknown status: ${node.status}`);
        }
      }
    });

    return `{\n${result.join('\n')}\n${getSpace(lvlNest)}}`;
  };
  return `${iter(tree, 0)}`;
};

export default getStylish;
