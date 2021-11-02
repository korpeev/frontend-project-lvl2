const getValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return null;
  }
  return value;
};

const plain = (data) => {
  const iter = (tree, parent) => tree.filter((node) => node.status !== 'equal')
    .map((node) => {
      const {
        status, key, value, children, beforeValue, afterValue,
      } = node;
      const prop = parent ? parent.concat('.', key) : key;
      if (value === null) { return null; }
      switch (status) {
        case 'added':
          return `Property '${prop}' was added with value: ${getValue(value)}`;
        case 'removed':
          return `Property '${prop}' was removed`;
        case 'updated':
          return `Property '${prop}' was updated. From ${getValue(beforeValue)} to ${getValue(afterValue)}`;
        default:
          return `${iter(children, prop).join('\n')}`;
      }
    });
  return `${iter(data).join('\n')}`;
};

export default plain;
