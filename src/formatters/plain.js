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
  const iter = (tree, parent) => tree.filter((node) => !node.equal)
    .map((node) => {
      const status = Object.keys(node).join('');
      const prop = parent ? `${parent}.${node[status].key}` : `${node[status].key}`;
      if (node[status].value === null) { return null; }
      switch (status) {
        case 'add':
          return `Property '${prop}' was added with value: ${getValue(node[status].value)}`;
        case 'remove':
          return `Property '${prop}' was removed`;
        case 'updated':
          return `Property '${prop}' was updated. From ${getValue(node[status].beforeValue)} to ${getValue(node[status].afterValue)}`;
        default:
          return `${iter(node[status].children, prop).join('\n')}`;
      }
    });
  return `${iter(data).join('\n')}`;
};

export default plain;
