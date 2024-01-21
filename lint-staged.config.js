const path = require('path');

module.exports = {
  '*': files => {
    // https://github.com/lint-staged/lint-staged/issues/522
    const cwd = process.cwd();
    const relPaths = files.map(file => {
      return path.relative(cwd, file);
    });

    return [
      `nx affected:lint --exclude=api`,
      `git add ${files.join(' ')}`,
    ];
  },
  '*.cs': 'dotnet format --include',
};
