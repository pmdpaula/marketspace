# Rocketseat Ignite - ReactNative 2023 - Desafio do projeto 03

App ***marketspace***

## Inicialização

`npx expo init marketspace --yarn`
ou
`npx create-expo-app marketspace --template`

## Instalações extras

### Lint e organização do código (dependências de desenvolvimento)
[eslint](https://eslint.org/docs/latest/use/getting-started)
[prettier](https://prettier.io/docs/en/install.html)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
```
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin
```

[Ciar alias para os imports, evitando passar caminhos complexos - babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)
```
yarn add -D babel-plugin-module-resolver
```


[Ordenar as importações - eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/)
```
yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module eslint-plugin-module-resolver
```
ver configurações necessárias do `eslint-import-resolver-typescript` para funcionar correto com o path mapping


~~[Ordenar as importações - eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)~~
```
#yarn add -D eslint-plugin-simple-import-sort~~
```

[Ordenar as importações - @trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports#readme)
```bash
yarn add -D @trivago/prettier-plugin-sort-imports
```
Este plugin pede para que coloque a ordenação que queremos no arquivo `.prettierrc.json` e ficaram esttas opções.

```json
  "importOrder": [
    "^react$",
    "^react-native$",
    "^@react-navigation$",
    "^@storage/(.*)$",
    "^@screens/(.*)$",
    "^@components/(.*)$",
    "^@assets/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
```


**Resumo**
```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin

yarn add -D eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module

yarn add -D babel-plugin-module-resolver

yarn add -D @trivago/prettier-plugin-sort-imports
```

ou
```bash
yarn add -D eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/eslint-plugin eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript eslint-import-resolver-babel-module babel-plugin-module-resolver @trivago/prettier-plugin-sort-imports
```


### Adição de recursos na aplicação

- [Adição de fontes Google](https://docs.expo.dev/guides/using-custom-fonts/#using-a-google-font)
```bash
npx expo install expo-font @expo-google-fonts/karla
```


- [Pacote de componentes - NativeBase](https://docs.nativebase.io/getting-started)
```bash
yarn add native-base
npx expo install react-native-svg@12.1.1
npx expo install react-native-safe-area-context@3.3.2
```

- [Navegação nas páginas - React Navigation](https://reactnavigation.org/docs/getting-started/)
```bash
yarn add @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

yarn add @react-navigation/native-stack
yarn add @react-navigation/bottom-tabs
```
Acima instalamos duas formas de navegação: stack e bottom-tabs


[Permitir importação de SVGs como se fossem imagens - react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)
```bash
yarn add -D react-native-svg-transformer
```

Para Expo precisamos fazer as configurações como no link
https://github.com/kristerkari/react-native-svg-transformer#for-expo-sdk-v4100-or-newer

Arquivo: `metro.config.js`

```javascript
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
```

[Importação de imagem - expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
```bash
npx expo install expo-image-picker
```

[Controle e validação de formulários - React Hook Form](https://react-hook-form.com/get-started/)
```bash
yarn add react-hook-form
```

[Requisições com o backend - Axios](https://axios-http.com/ptbr/docs/intro)
```bash
yarn add axios
```

[Armazenamento de dados no dispositivo - AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
```bash
npx expo install @react-native-async-storage/async-storage
```
Usaremos o AsyncStorage para persistir dados do usuário retornados do backend.


- [Phosphor Icons - biblioteca de ícones - phosphor-react-native](https://phosphoricons.com/)
```bash
yarn add phosphor-react-native
npx expo install react-native-svg
```


[Manipulação de arquivos no dispositivo - Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/)
```bash
npx expo install expo-file-system
```

[Validação de formulários - Yup](https://react-hook-form.com/get-started/#SchemaValidation)
```bash
yarn add @hookform/resolvers yup
```


---------------------- Bibliotecas não utilizadas ainda ----------------------






[Manter a SplashScreen até leitura das fontes - expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
```bash
npx expo install expo-splash-screen
```

[Manipulação de data - date-fns](https://date-fns.org/docs/Getting-Started#installation)
```bash
yarn add date-fns
```

[Geração de hash para IDs - react-native-uuid](https://github.com/eugenehp/react-native-uuid)
```bash
yarn add react-native-uuid
```


~[Seleção nos campos de data e hora - datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)~
```bash
expo install @react-native-community/datetimepicker
```

[Seleção nos campos de data e hora - React Native Date Picker](https://github.com/henninghall/react-native-date-picker)
```bash
yarn add react-native-date-picker
```

## Configurações do projeto

### Path mapping

Mapeamento dos diretórios usando o babel-plugin-module-resolver.
Exemplo do que foi feito.

No arquivo `babel.config.js` foi adicionado as seguintes linhas:
```javascript
...
plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@types': './src/@types',
          '@navigation': './src/navigation',
          '@context': './src/context',
          '@services': './src/services',
          '@config': './src/config',
          '@constants': './src/constants',
          '@store': './src/store',
          '@styles': './src/styles',
          '@i18n': './src/i18n',
          '@locales': './src/locales',

        }
      }]
    ]

```

No arquivo `tsconfig.json` foi adicionado as seguintes linhas:
```javascript
...
"baseUrl": "./",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@assets/*": ["./src/assets/*"],
      "@types/*": ["./src/@types/*"],
      "@navigation/*": ["./src/navigation/*"],
      "@context/*": ["./src/context/*"],
      "@services/*": ["./src/services/*"],
      "@config/*": ["./src/config/*"],
      "@constants/*": ["./src/constants/*"],
      "@store/*": ["./src/store/*"],
      "@styles/*": ["./src/styles/*"],
      "@i18n/*": ["./src/i18n/*"],
      "@locales/*": ["./src/locales/*"],
    }
```
