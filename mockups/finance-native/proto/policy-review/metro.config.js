const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
const moneyOps = path.resolve(__dirname, '../..');
config.watchFolders = [moneyOps];
config.resolver.nodeModulesPaths = [path.join(__dirname, 'node_modules'), path.join(moneyOps, 'node_modules')];
module.exports = config;
