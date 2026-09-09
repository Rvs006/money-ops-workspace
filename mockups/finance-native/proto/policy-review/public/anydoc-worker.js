import init, { toMarkdownBytes } from './vendor/anydoc/anydoc_wasm.js';

const ready = init();
const messages = {
  unsupported: 'This document format is not supported.',
  needsOcr: 'This file contains scanned pages. Local text extraction cannot read them.',
  malformed: 'The document could not be read. Try an original text document.',
  encrypted: 'This document is password protected. Use an unlocked copy.',
  resourceLimit: 'This document exceeds the local converter limits.',
  missingPart: 'The document is missing content needed for extraction.',
};

self.onmessage = async ({ data }) => {
  try {
    if (!(data.bytes instanceof ArrayBuffer)) throw new Error('Invalid input');
    await ready;
    self.postMessage({ ready: true });
    const markdown = toMarkdownBytes(new Uint8Array(data.bytes), data.format || undefined);
    self.postMessage({ markdown });
  } catch (error) {
    const code = Object.hasOwn(messages, error?.code) ? error.code : 'conversionFailed';
    self.postMessage({ error: { code, message: messages[code] || 'The document could not be converted on this device.' } });
  }
};
