module.exports = {
  '*.{js,ts,tsx}': ['lint:write'],
  '*.{md,mdx,json,yaml}': ['prettier "**/*.{md,mdx,json,yaml}" --write'],
};
