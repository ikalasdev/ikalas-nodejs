# Official Ikalas Node.js API Library

> Official package to interact with the Ikalas API https://ikalas.com/app/documentation
## Installation

1. This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
If this is a brand new project, make sure to create a `package.json` first with
the ``npm init``  [command](https://docs.npmjs.com/creating-a-package-json-file).

2. Install the module using
```bash
npm install @ikalasdev/ikalas
```

## Examples

```js
const ikalas = require('@ikalasdev/ikalas')
ikalas.setApiKey('YOUR_API_KEY');

generateWallets();

async function generateWallets() {
    let wallets = await ikalas.execute("batch-wallet-generator");
    return wallets;
}

generateRandomEmails();

async function generateRandomEmails() {
    let emails = await ikalas.execute("generate-random-emails", {count:5});
    return emails;
}

generateQrCode();

async function generateQrCode() {
    let qrCode = await ikalas.execute("generate-qrcode", { qrCodeData: "ikalas" });
    return qrCode;
}

bep20Faucet();

async function bep20Faucet() {
    let token = await ikalas.execute("bep20-faucet", { walletAddress: "YOUR_WALLET_ADDRESS"});
    return token;
}

jsonToCsv();

async function jsonToCsv() {
    let csv = await ikalas.execute("json-to-csv", { jsonString: '{"test":"ikalas"}'});
    return csv;
}

csvToJson();

async function csvToJson() {
    let json = await ikalas.execute("csv-to-json", { csvString: '"ourselves","fly","ring"\n"putting","running","catch"\n"afternoon","full","research"\n' });
    return json;
}

fileAsData();

async function fileAsData() {
    let stream = fs.createReadStream("/path/file")
    let json = await ikalas.execute("json-to-csv", {file: stream});
    return json;
}
```

[Check the api documentation here](https://ikalas.com/app/documentation)

[Check the test code in the repository](https://github.com/ikalasdev/ikalas-nodejs)