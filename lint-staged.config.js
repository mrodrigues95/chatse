module.exports = {
  '*': ['nx affected:lint --exclude=api --fix --uncomitted', 'pnpm run format:write'],
};
