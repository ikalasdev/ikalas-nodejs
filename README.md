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
```
```js
generateRandomEmails();

async function generateRandomEmails() {
    let emails = await ikalas.execute("generate-random-emails", {count:5});
    return emails;
}
```
```js
generateQrCode();

async function generateQrCode() {
    let qrCode = await ikalas.execute("generate-qrcode", { qrCodeData: "ikalas" });
    return qrCode;
}
```
```js
bep20Faucet();

async function bep20Faucet() {
    let token = await ikalas.execute("bep20-faucet", { walletAddress: "YOUR_WALLET_ADDRESS"});
    return token;
}
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

jsonFileToYamlFile();

async function jsonFileToYamlFile() {
    let stream = fs.createReadStream("path/to/file1.json")
    let stream2 = fs.createReadStream("path/to/file2.json")
    let arrayOfFiles = await ikalas.execute("convert-json-file-to-yaml-file", { files: [stream, stream2]})
}

csvToJson();

async function csvToJson() {
    let json = await ikalas.execute("csv-to-json", { csvString: '"ourselves","fly","ring"\n"putting","running","catch"\n"afternoon","full","research"\n' });
    return json;
}

```

## Data

To create or update data in the [Ikalas](https://ikalas.com/app) website use the set method by passing a key and a value for that data as parameters.

The set method returns the id of the data when created or updated succesfuly.

```js
returnValue = await updateOrCreateData("myEmail", "john@gmail.com"); // returns id

async function updateOrCreateData(key, value) {
  let id = await ikalas.set(key, value);
  return id;
}

console.log("id: ", returnValue)

// Expected output 
// id: 6
```

To retrieve an already created data use the get method by passing the key as a parameter.

```js
returnValue = await getData("myEmail"); // returns value

async function getData(key) {
  let data = await ikalas.get(key);
  return data;
}

console.log("value data: ", returnValue)

// Expected output
// value data: john@gmail.com
```

[Check the api documentation here](https://ikalas.com/app/documentation)

[Check the test code in the repository](https://github.com/ikalasdev/ikalas-nodejs)
