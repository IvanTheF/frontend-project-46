import yaml from 'js-yaml';

const parser = (fileData, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
    case 'yaml':
      return yaml.load(fileData);
    default:
      throw new Error('Unknown format');
  }
};

export default parser;
