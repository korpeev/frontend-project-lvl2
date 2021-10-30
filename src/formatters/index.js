import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatType) => {
  switch (formatType) {
    case 'json':
      return json(tree);
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('Format unsupported!');
  }
};

export default format;
