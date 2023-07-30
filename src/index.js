import _ from 'lodash';
import path, { format } from 'path';
import fs from 'fs';

const genDiff = (filepath1, filepath2, format) => {
    const absPath1 = path.resolve(process.cwd(), 'files', filepath1);
    const absPath2 = path.resolve(process.cwd(), 'files', filepath2);

    const fileData1 = fs.readFileSync(absPath1, 'utf-8');
    const fileData2 = fs.readFileSync(absPath1, 'utf-8');

    const fileType1 = path.extname(absPath1);
    const fileType2 = path.extname(absPath2);

    let parsedData1;
    let parsedData2;

    if(fileType1 === '.json') {
        parsedData1 = JSON.parse(fileData1);
    }

    if(fileType2 === '.json') {
        parsedData2 = JSON.parse(fileData2);
    }

    const data = [];
    const keys = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
    const sortedKeys = _.sortBy(keys);

    sortedKeys.map((key) => {
        if (parsedData1[key] === parsedData2[key]) {
            data.push({ key, status: 'unchanged', value: parsedData1[key] });
        }

        if (!_.has(parsedData1, key)) {
            data.push({ key, status: 'added', value: parsedData2[key] });
        }

        if (!_.has(parsedData2, key)) {
            data.push({ key, status: 'delited', value: parsedData1[key] });
        }

        if (parsedData1[key] !== parsedData2[key]) {
            data.push({ key, status: 'changed', newValue: parsedData1[key], oldValue: parsedData2[key], });
        };
    });

    const result = data.map((node) => {
        switch (node.status) {
            case 'unchanged': {
                return `${'  '}: ${node.key}: ${node.value}`;
            }
            case 'changed': {
                return `${'+ '}: ${node.key}: ${node.newValue}\n ${'-'}: ${node.key}: ${node.oldValue}`;
            }
            case 'added': {
                return `${'+ '}: ${node.key}: ${node.value}`;
            }
            case 'delited': {
                return `${'- '}: ${node.key}: ${node.value}`;
            }
            default: {
                throw new Error(`Unknown status`);
            }
        }
    });

    return result .join('\n');

};

export default genDiff;