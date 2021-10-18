export const currentIndent = (depth, ident = 4) => ' '.repeat(ident + depth);

const stringify = (obj, spaceCount) => {
  const iter = (current, depth) => {
    if (typeof current !== 'object') {
      return `${current}`;
    }
    if (current === null) {
      return null;
    }

    const lines = Object
      .entries(current)
      .map(([key, value]) => `${currentIndent(depth + 4)}${key}: ${iter(value, depth + 4)}`);

    return ['{',
      ...lines,
      `${currentIndent(depth)}}`,
    ].join('\n');
  };
  return iter(obj, spaceCount);
};

export default stringify;
