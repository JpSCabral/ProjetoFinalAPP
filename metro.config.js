// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configuração que você já deve ter para o react-native-svg-transformer
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// --- AQUI ESTÁ A CORREÇÃO PARA O ERRO DAS FONTES ---
// Adicionamos 'ttf' e 'otf' à lista de assets reconhecidos pelo Metro.
config.resolver.assetExts.push("ttf", "otf");

module.exports = config;
