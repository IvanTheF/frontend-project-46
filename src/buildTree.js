import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, status: 'nested', children: buildTree(obj1[key], obj2[key]) };
    }

    if (obj1[key] === obj2[key]) {
      return { key, status: 'unchanged', value: obj1[key] };
    }

    if (!_.has(obj1, key)) {
      return { key, status: 'added', value: obj2[key] };
    }

    if (!_.has(obj2, key)) {
      return { key, status: 'delited', value: obj1[key] };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key, status: 'changed', newValue: obj1[key], oldValue: obj2[key],
      };
    }
  });

  return result;
};

export default buildTree;
