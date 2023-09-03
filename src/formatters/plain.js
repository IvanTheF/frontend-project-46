import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const iter = (data, path = '', lvlNest = 1) => {
  const result = data.flatMap((node) => {
    switch (node.status) {
      case 'unchanged': {
        return [];
      }
      case 'changed': {
        return `Property '${[...path, node.key].join('.')}' was updated. From ${getValue(node.newValue)} to ${getValue(node.oldValue)}`;
      }
      case 'added': {
        return `Property '${[...path, node.key].join('.')}' was added with value: ${getValue(node.value)}`;
      }
      case 'deleted': {
        return `Property '${[...path, node.key].join('.')}' was removed`;
      }
      case 'nested': {
        return iter(node.children, [...path, node.key], lvlNest + 1);
      }
      default: {
        return [];
      }
    }
  });
  return result.join('\n');
};
const getPlain = (tree) => iter(tree, [], 1);

export default getPlain;
