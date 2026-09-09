const fs = require('node:fs');
const path = require('node:path');

const source = path.dirname(require.resolve('@firecrawl/anydoc-wasm'));
const destination = path.resolve(__dirname, '../public/vendor/anydoc');
fs.mkdirSync(destination, { recursive: true });
for (const filename of ['anydoc_wasm.js', 'anydoc_wasm_bg.wasm', 'LICENSE']) {
  fs.copyFileSync(path.join(source, filename), path.join(destination, filename));
}
console.log('Copied AnyDoc runtime and MIT licence to public/vendor/anydoc.');
