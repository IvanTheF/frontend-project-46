import _ from "lodash";

const getSpace = (lvlNest, replacer = ' ', spacesCount = 4) => replacer.repeat(lvlNest * spacesCount);

const getString = (data, lvlNest) => {
    if (!_.isPlainObject(data)) {
        return String(data);
    }
    const str = Object.entries(data).map(([key, value]) => `\n${getSpace(lvlNest + 1)}${key}: ${getString(value, lvlNest + 1)}`).join(' ');
    return `{${str}\n${getSpace(lvlNest)}}`;
};

const getStylish = (data, lvlNest = 1) => {
const result = data.map((node) => {
    switch (node.status) {
      case 'unchanged': {
        return `${getSpace(lvlNest)}    ${node.key}: ${getString(node.value, lvlNest)}`;
      }
      case 'changed': {
        return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.newValue, lvlNest)}\n${getSpace(lvlNest)}  + ${node.key}: ${getString(node.oldValue, lvlNest)}`;
      }
      case 'added': {
        return `${getSpace(lvlNest)}  + ${node.key}: ${getString(node.value, lvlNest)}`;
      }
      case 'delited': {
        return `${getSpace(lvlNest)}  - ${node.key}: ${getString(node.value,  lvlNest)}`;
      }
      case 'nested': {
        return `${getSpace(lvlNest)}${node.key}: ${getStylish(node.children, lvlNest + 1)}`;
      }
      default: {
        throw new Error('Unknown status');
      }
    }
  });

  return `{\n${result.join('\n')}\n${getSpace(lvlNest)}}`;
};

export default getStylish;
