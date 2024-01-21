module.exports = {
  '*': [
    'nx affected:lint --exclude=api --fix --uncomitted',
    'nx format:write --exclude=api --uncomitted',
  ],
};
