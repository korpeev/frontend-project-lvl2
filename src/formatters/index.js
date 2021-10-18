import stylish from './stylish.js';

const format = (tree, formatType) => {
  if (formatType === 'stylish') {
    return stylish(tree);
  }
  throw new Error('Format unsupported!');
};

export default format;
