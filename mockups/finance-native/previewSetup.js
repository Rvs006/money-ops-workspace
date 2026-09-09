// Keep OpenUI's development inspector out of the user-facing prototype.
// This is the auto-mount guard used by react-lang 0.2.15's web entry.
globalThis[Symbol.for('openui.devtools.autoMount')] = true;
