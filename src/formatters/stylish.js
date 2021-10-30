// eslint-disable-next-line import/no-cycle
import stringify from './stringify.js';

export const currentIndent = (depth, backSpace = 0, indent = 4) => ' '.repeat(indent * depth - backSpace);
const stylish = (data) => {
  const iter = (tree, depth) => tree.map((node) => {
    const status = Object.keys(node).join('');
    switch (status) {
      case 'add':
        return `${currentIndent(depth, 2)}+ ${node[status].key}: ${stringify(node[status].value, depth)}\n`;
      case 'remove':
        return `${currentIndent(depth, 2)}- ${node[status].key}: ${stringify(node[status].value, depth)}\n`;
      case 'equal':
        return `${currentIndent(depth, 2)}  ${node[status].key}: ${stringify(node[status].value, depth)}\n`;
      case 'updated':
        return `${currentIndent(depth, 2)}- ${node[status].key}: ${stringify(node[status].beforeValue, depth)}\n${currentIndent(depth, 2)}+ ${node[status].key}: ${stringify(node[status].afterValue, depth)}\n`;
      default:
        return `${currentIndent(depth)}${node[status].key}: {\n${iter(node[status].children, depth + 1).join('')}${currentIndent(depth)}}\n`;
    }
  });
  return `{\n${iter(data, 1).join('')}}`;
};

export default stylish;
