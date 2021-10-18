import stringify, { currentIndent } from './stringify.js';

const stylish = (data) => {
  const iter = (tree, depth) => tree.map((node) => {
    const status = node[0];
    const {
      key, val, val1, val2,
    } = node[1];
    switch (status) {
      case 'add':
        return `${currentIndent(depth - 2)}+ ${key}: ${stringify(val, depth)}\n`;
      case 'remove':
        return `${currentIndent(depth - 2)}- ${key}: ${stringify(val, depth)}\n`;
      case 'equal':
        return `${currentIndent(depth - 2)}  ${key}: ${stringify(val, depth)}\n`;
      case 'updated':
        return `${currentIndent(depth - 2)}- ${key}: ${stringify(val1, depth)}\n${currentIndent(depth - 2)}+ ${key}: ${stringify(val2, depth)}\n`;
      default:
        return `${currentIndent(depth)}${key}: {\n${iter(val, depth + 4).join('')}${currentIndent(depth)}}\n`;
    }
  });
  return `{\n${iter(data, 0).join('')}}`;
};

export default stylish;
