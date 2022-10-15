# Official Ikalas Node.js API Library

> Official package to interact with the Ikalas API https://ikalas.com/app/documentation

## Installation

1. This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
If this is a brand new project, make sure to create a `package.json` first with
the ``npm init``  [command](https://docs.npmjs.com/creating-a-package-json-file).

2. install the module using
```bash
npm install @ikalasdev/ikalas
```

## Examples

```js
const ikalas = require('@ikalasdev/ikalas')
ikalas.setApiKey('YOUR_API_KEY');

generateWallets();

async function generateWallets(){
    let wallets = await ikalas.execute("batch-wallet-generator");
    return wallets;
}
            

```

[Check the api documentation here](https://ikalas.com/app/documentation)

[Check the test code in the repository](https://github.com/ikalasdev/ikalas-nodejs)
