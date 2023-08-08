import _ from 'lodash';
import path, { format } from 'path';
import fs from 'fs';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, format) => {
    const absPath1 = path.resolve(process.cwd(), filepath1);
    const absPath2 = path.resolve(process.cwd(), filepath2);

    const fileData1 = fs.readFileSync(absPath1, 'utf-8');
    const fileData2 = fs.readFileSync(absPath2, 'utf-8');

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

    const data = buildTree(parsedData1, parsedData2);

    const result = data.map((node) => {
        switch (node.status) {
            case 'unchanged': {
                return `${' '} ${node.key}: ${node.value}`;
            }
            case 'changed': {
                return `${'+'} ${node.key}: ${node.newValue}\n ${'-'}: ${node.key}: ${node.oldValue}`;
            }
            case 'added': {
                return `${'+'} ${node.key}: ${node.value}`;
            }
            case 'delited': {
                return `${'-'} ${node.key}: ${node.value}`;
            }
            default: {
                throw new Error(`Unknown status`);
            }
        }
    });

    return result .join('\n');

};

export default genDiff;