import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, formatType) => {
  if (formatType === 'stylish') {
    return stylish(tree);
  }

  if (formatType === 'plain') {
    return plain(tree);
  }

  if (formatType === 'json') {
    return json(tree);
  }

  throw new Error('Format unsupported!');
};

export default format;
