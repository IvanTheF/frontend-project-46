import _ from 'lodash';

const getSpace = (lvlNest, replacer = ' ', spacesCount = 4) => replacer.repeat(lvlNest * spacesCount);

const getString = (data, lvlNest) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const str = Object.entries(data).map(([key, value]) => `\n${getSpace(lvlNest + 1)}${key}: ${getString(value, lvlNest + 1)}`).join(' ');
  return `{${str}\n${getSpace(lvlNest)}}`;
};

const getStylish = (arr) => {
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
        case 'delited': {
          return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.value, lvlNest + 1)}`;
        }
        case 'nested': {
          return `${getSpace(lvlNest + 1)}${node.key}: {\n${iter(node.children, lvlNest + 1)}\n${getSpace(lvlNest + 1)}}`;
        }
        default: {
          throw new Error('Unknown status');
        }
      }
    });

    return result.join('\n');
  };
  return `{\n${iter(arr, 0)}\n}`;
};

export default getStylish;
