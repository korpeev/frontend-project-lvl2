import yaml from 'js-yaml';

export default (file, ext) => {
  if (ext === 'json') {
    return JSON.parse(file);
  }

  if (ext === 'yml' || ext === 'yaml') {
    return yaml.load(file);
  }
  throw new Error('Type of file unsupported');
};
