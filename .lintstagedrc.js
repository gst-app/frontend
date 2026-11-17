import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  "*.{js,jsx,ts,tsx}": ["oxlint --fix", "oxfmt"],
};
