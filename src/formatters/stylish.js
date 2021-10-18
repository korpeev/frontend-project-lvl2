import stringify, { currentIndent } from './stringify.js';

const stylish = (data) => {
  const iter = (tree, depth) => tree.map((node) => {
    if (node[0] === 'add') {
      return `${currentIndent(depth - 2)}+ ${node[1].key}: ${stringify(node[1].val, depth)}\n`;
    }
    if (node[0] === 'remove') {
      return `${currentIndent(depth - 2)}- ${node[1].key}: ${stringify(node[1].val, depth)}\n`;
    }

    if (node[0] === 'equal') {
      return `${currentIndent(depth - 2)}  ${node[1].key}: ${stringify(node[1].val, depth)}\n`;
    }

    if (node[0] === 'updated') {
      return `${currentIndent(depth - 2)}- ${node[1].key}: ${stringify(node[1].val1, depth)}\n${currentIndent(depth - 2)}+ ${node[1].key}: ${stringify(node[1].val2, depth)}\n`;
    }
    return `${currentIndent(depth)}${node[1].key}: {\n${iter(node[1].val, depth + 4).join('')}${currentIndent(depth)}}\n`;
  });
  return `{\n${iter(data, 0).join('')}}`;
};

export default stylish;
