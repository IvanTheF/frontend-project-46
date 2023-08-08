import _ from 'lodash';

const buildTree = (obj1, obj2) => {
    const data = [];
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedKeys = _.sortBy(keys);

    sortedKeys.map((key) => {
        if (obj1[key] === obj2[key]) {
            data.push({ key, status: 'unchanged', value: obj1[key] });
        }

        if (!_.has(obj1, key)) {
            data.push({ key, status: 'added', value: obj2[key] });
        }

        if (!_.has(obj2, key)) {
            data.push({ key, status: 'delited', value: obj1[key] });
        }

        if (obj1[key] !== obj2[key]) {
            data.push({ key, status: 'changed', newValue: obj1[key], oldValue: obj2[key], });
        };
    });
    
    return data;
};

export default buildTree;