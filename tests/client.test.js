const fs = require("fs");
require("dotenv").config();
const Client = require("../src/classes/client");
const https = require("https");

try {
  fs.unlinkSync(tempPath);
  fs.unlinkSync(tempPath2);
  fs.unlinkSync(tempPath3);
} catch (error) {}

const client = new Client();

const downloadFile = async (url, dest) => {
  await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let filePath = fs.createWriteStream(dest);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        resolve();
      });
      filePath.on("error", (e) => {
        console.log("error", e);
        // reject()
      });
    });
  });
};

describe("tests client", () => {
  beforeEach(() => {
    client.setApiKey(process.env.IKALAS_API_KEY);
  });

  test("simple remote call", async () => {
    let result = await client.execute("batch-wallet-generator", {
      numberOfWallets: "10",
    });
    expect(result.includes("10 addresses generated")).toBe(true);
  });

  test("simple remote call with uploading one file", async () => {
    const stream = fs.createReadStream(__dirname + "/files/chatgpt_icon.png");
    let result = await client.execute("generate-qrcode", {
      qrCodeData: "ikalas.com",
      files: [stream],
    });
    expect(result.length).toBe(1);
    expect(result[0].outputFileUrl.substring(0, 5)).toBe("https");
  });

  test("get file", async () => {
    let result = await client.execute("generate-qrcode", {
      qrCodeData: "ikalas.com",
    });
    expect(result.length).toBe(1);
    expect(result[0].outputFileUrl.substring(0, 5)).toBe("https");
  });

  test("local", async () => {
    const clientLocal = new Client();
    clientLocal.setApiKey("IKALAS_WEB-API-KEY");
    clientLocal.setBaseUrl("http://localhost:9595");

    let result = await clientLocal.execute("batch-wallet-generator", {
      numberOfWallets: "10",
    });
    expect(result.length).toBe(10);
  });

  test("text content should match pdf content", async () => {
    fileStream1 = fs.createReadStream(__dirname + "/files/file1.pdf");
    fileStream2 = fs.createReadStream(__dirname + "/files/pdf-sample.pdf");
    fileStream3 = fs.createReadStream(__dirname + "/files/file-sample.pdf");

    let result = await client.execute("pdf-to-text", {
      files: [fileStream1, fileStream2, fileStream3],
    });

    const tempPath = __dirname + "/files/temp.txt";
    const tempPath2 = __dirname + "/files/temp2.txt";
    const tempPath3 = __dirname + "/files/temp3.txt";

    await downloadFile(result[0].outputFileUrl, tempPath);
    testStrings = [
      "THE DECLARATION OF INDEPENDENCE",
      "Lorem ipsum",
      "Adobe Acrobat PDF Files",
    ];
    let data = fs.readFileSync(tempPath, "utf8");
    let test = testStrings.some((v) => data.includes(v));
    expect(test).toBe(true);
    fs.unlinkSync(tempPath);

    await downloadFile(result[0].outputFileUrl, tempPath2);
    data = fs.readFileSync(tempPath2, "utf8");
    test = testStrings.some((v) => data.includes(v));
    fs.unlinkSync(tempPath2);
    expect(test).toBe(true);

    await downloadFile(result[0].outputFileUrl, tempPath3);
    data = fs.readFileSync(tempPath3, "utf8");
    test = testStrings.some((v) => data.includes(v));
    fs.unlinkSync(tempPath3);
    expect(test).toBe(true);
  }, 5000);
});
