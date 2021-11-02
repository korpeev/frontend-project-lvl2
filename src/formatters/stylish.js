import _ from 'lodash';

const currentIndent = (depth, backSpace = 0, indent = 4) => ' '.repeat(indent * depth - backSpace);

const formatValue = (current, depth, iter) => {
  if (!_.isPlainObject(current)) {
    return `${current}`;
  }
  const lines = Object
    .entries(current)
    .map(([key, value]) => `${currentIndent(depth)}${key}: ${iter(value, depth + 1)}`);
  return ['{',
    ...lines,
    `${currentIndent(depth - 1)}}`,
  ].join('\n');
};

const stringify = (obj, spaceCount) => {
  const iter = (current, depth) => formatValue(current, depth, iter);
  return iter(obj, spaceCount);
};

const stylish = (data) => {
  const iter = (tree, depth) => tree.map((node) => {
    const {
      status, key, value, children, beforeValue, afterValue,
    } = node;
    switch (status) {
      case 'added':
        return `${currentIndent(depth, 2)}+ ${key}: ${stringify(value, depth + 1)}\n`;
      case 'removed':
        return `${currentIndent(depth, 2)}- ${key}: ${stringify(value, depth + 1)}\n`;
      case 'equal':
        return `${currentIndent(depth, 2)}  ${key}: ${stringify(value, depth + 1)}\n`;
      case 'updated':
        return `${currentIndent(depth, 2)}- ${key}: ${stringify(beforeValue, depth + 1)}\n${currentIndent(depth, 2)}+ ${key}: ${stringify(afterValue, depth + 1)}\n`;
      default:
        return `${currentIndent(depth)}${key}: {\n${iter(children, depth + 1).join('')}${currentIndent(depth)}}\n`;
    }
  });
  return `{\n${iter(data, 1).join('')}}`;
};

export default stylish;
