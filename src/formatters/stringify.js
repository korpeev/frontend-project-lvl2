import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import { currentIndent } from './stylish.js';

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
  return iter(obj, spaceCount + 1);
};

export default stringify;
