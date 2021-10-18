const plain = (data) => {
  const iter = (tree, parent) => tree.filter((node) => node[0] !== 'equal')
    .map((node) => {
      const prop = parent ? `${parent}.${node[1].key}` : `${node[1].key}`;
      const getValue = (val) => {
        if (typeof val === 'object' && val !== null) {
          return '[complex value]';
        } if (typeof val === 'string') {
          return `'${val}'`;
        } if (val === null) {
          return null;
        }
        return val;
      };
      if (node[1].val === null) { return null; }
      if (node[0] === 'add') {
        return `Property '${prop}' was added with value: ${getValue(node[1].val)}`;
      }
      if (node[0] === 'remove') {
        return `Property '${prop}' was removed`;
      }
      if (node[0] === 'updated') {
        return `Property '${prop}' was updated. From ${getValue(node[1].val1)} to ${getValue(node[1].val2)}`;
      }
      return `${iter(node[1].val, prop).join('\n')}`;
    });
  return `${iter(data, 0).join('\n')}`;
};

export default plain;
