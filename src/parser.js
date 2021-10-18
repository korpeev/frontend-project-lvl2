import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const file = fs.readFileSync(filepath, 'utf-8');
  const ext = path.extname(filepath);
  if (ext === '.json') {
    return JSON.parse(file);
  }

  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(file);
  }
  throw new Error('Type of file unsupported');
};
