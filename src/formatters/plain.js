const getValue = (value) => {
  if (value === null) {
    return null;
  }
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const plain = (data) => {
  const iter = (tree, parent) => tree.filter((node) => node.status !== 'equal')
    .map((node) => {
      const { status, key } = node;
      const prop = parent ? parent.concat('.', key) : key;
      switch (status) {
        case 'added': {
          const { value } = node;
          return `Property '${prop}' was added with value: ${getValue(value)}`;
        }
        case 'removed': {
          return `Property '${prop}' was removed`;
        }
        case 'updated': {
          const { beforeValue, afterValue } = node;
          return `Property '${prop}' was updated. From ${getValue(beforeValue)} to ${getValue(afterValue)}`;
        }
        case 'recursive': {
          const { children } = node;
          return `${iter(children, prop).join('\n')}`;
        }
        default:
          throw new Error(`type node not found: ${status}`);
      }
    });
  return `${iter(data).join('\n')}`;
};

export default plain;
