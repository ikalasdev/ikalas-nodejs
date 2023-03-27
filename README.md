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
    let wallets = await ikalas.execute("batch-wallet-generator", {numberOfWallets: 1});
    return wallets;
}
```
Will return
```
[
  {
    "Public key": "0x7493C69D5f8F04dD0BD8D243fbdBC9769D70C0Cc"
    "Private key": "0xa8e25e8bc566f1cf01f59a11aa01d7f0f68722cd72789ac0f60a8aae0f7cdb2d"
  }
]
```
```js
generateRandomEmails();

async function generateRandomEmails() {
    let emails = await ikalas.execute("generate-random-emails", {count:5});
    return emails;
}
```
Will return
```
Toby.Littel@yahoo.com
Ola2@hotmail.com
Hillard49@gmail.com
Trey0@hotmail.com
Sheldon.Brekke57@hotmail.com
```
```js
generateQrCode();

async function generateQrCode() {
    let qrCode = await ikalas.execute("generate-qrcode", { qrCodeData: "ikalas" });
    return qrCode;
}
```
Will return
```
[
    {
      outputFileId: '393ec9c1-05e8-4aa4-bced-df09a9d5362e',
      outputFileName: 'qrcode-636480ed-f04b-4330-9ef1-b14ba0e516d8.png',
      outputFileExtension: 'png',
      outputFileHasPreview: true,
      outputFileIsImage: true,
      outputFileUrl: 'https://storage.googleapis.com/ikalas-public/aa26a3f4-b529-4a8e-88d4-50d848e15f23.png'
    }
  ]
```
```js
bep20Faucet();

async function bep20Faucet() {
    let token = await ikalas.execute("bep20-faucet", { walletAddress: "YOUR_WALLET_ADDRESS"});
    return token;
}
```
Will return
```
generate wallets Success ! 10000 KIKF were sent to your wallet. Transaction hash: 0x1a88880cfe8357509565094c55f0ad65ff1c9b49b84dc6a58b85d4f7f0ec398b
```
```js
jsonToCsv();

async function jsonToCsv() {
    let csv = await ikalas.execute("json-to-csv", { jsonString: '{"id":1,"str":"test"}'});
    return csv;
}
```
will return
```
id,str
1,test
```
```js
jsonFileToCsvFile();

async function jsonFileToCsvFile() {
    let stream = fs.createReadStream("path/to/file1.json")
    let stream2 = fs.createReadStream("path/to/file2.json")
    let arrayOfFiles = await ikalas.execute("json-to-csv-file", { files: [stream, stream2]})
}
```
Will return
```
[
    {
      outputFileId: '37421539-41fa-4b35-a2d6-fa012b4ed562',
      outputFileName: 'data.csv',
      outputFileExtension: 'csv',
      outputFileUrl: 'https://storage.googleapis.com/ikalas-public/9ce74909-d00f-4c5f-80b1-ae87d02bf505.csv'
    },
    {
      outputFileId: 'd051dfd7-21cb-4f1f-b688-ed09521c6386',
      outputFileName: 'data2.csv',
      outputFileExtension: 'csv',
      outputFileUrl: 'https://storage.googleapis.com/ikalas-public/6c8b97b3-bb57-4b28-a7ba-383e7ab0ddc2.csv'
    }
  ]
```
```js
jsonFileToYamlFile();

async function jsonFileToYamlFile() {
    let stream = fs.createReadStream("path/to/file1.json")
    let stream2 = fs.createReadStream("path/to/file2.json")
    let arrayOfFiles = await ikalas.execute("convert-json-file-to-yaml-file", { files: [stream, stream2]})
}
```
Will return
```
[
    {
      outputFileId: 'b0cd1dd7-04e9-4a1c-882d-36d3270b9271',
      outputFileName: 'data.yaml',
      outputFileExtension: 'yaml',
      outputFileUrl: 'https://storage.googleapis.com/ikalas-public/ade94b28-7d45-4654-be46-99de00ffed71.yaml'
    },
    {
      outputFileId: 'f7b05d65-2cb6-4f64-b25d-0ea1b025a69f',
      outputFileName: 'data2.yaml',
      outputFileExtension: 'yaml',
      outputFileUrl: 'https://storage.googleapis.com/ikalas-public/20ae14d7-f2cf-48fe-bda9-7896bbf7a17e.yaml'
    }
  ]
```
```js
csvToJson();

async function csvToJson() {
    let json = await ikalas.execute("csv-to-json", { csvString: '"ourselves","fly","ring"\n"putting","running","catch"\n"afternoon","full","research"\n' });
    return json;
}

```
Will return
```
[
    { ourselves: 'putting', fly: 'running', ring: 'catch' },
    { ourselves: 'afternoon', fly: 'full', ring: 'research' }
]
```

[Check the api documentation here](https://ikalas.com/app/documentation)

[Check the test code in the repository](https://github.com/ikalasdev/ikalas-nodejs)
