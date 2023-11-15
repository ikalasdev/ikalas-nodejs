const fs = require("fs");
require("dotenv").config();
const Client = require("../src/classes/client");
const FormData = require("form-data");
const https = require("https");
const createFormData = require("../src/utils");

const stream1 = fs.createReadStream(__dirname + "/files/file1.pdf");
const stream2 = fs.createReadStream(__dirname + "/files/chatgpt_icon.png");

const args = {
  inputFiles: [
    stream1,
    stream2
  ],
	prompt: "prompt text"
}

describe("tests client", () => {
  beforeEach(() => {
    client = new Client();
    client.setApiKey(process.env.IKALAS_API_KEY);
  });

  test("simple remote call", async () => {
    let result = await client.execute("batch-wallet-generator", {
      numberOfWallets: "10",
    });
    expect(result.length).toBe(10);
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
    console.log(result);
    expect(result.length).toBe(1);
    expect(result[0].outputFileUrl.substring(0, 5)).toBe("https");
  });

  test("local", async () => {
    client = new Client();
    client.setApiKey("IKALAS_WEB-API-KEY");
    client.setBaseUrl("http://localhost:9595");

    let result = await client.execute("batch-wallet-generator", {
      numberOfWallets: "10",
    });
    expect(result.length).toBe(10);
  });

  test("should include all args", () => {
    var data = new FormData();
    
    for (const [key, value] of Object.entries(args)) {
      createFormData(data, key, value);
    }

    expect(data._streams[0].split("filename")[1].split("\"")[1].split("\"")[0]).toBe("file1.pdf");
    expect(data._streams[3].split("filename")[1].split("\"")[1].split("\"")[0]).toBe("chatgpt_icon.png");
    expect(data._streams[7]).toBe("prompt text");
  });

  test("text content should match pdf content", async () => {
    const downloadFile = async (url, dest) => {
      await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let filePath = fs.createWriteStream(dest);
          res.pipe(filePath);
          filePath.on("finish", () => {
            filePath.close();
            console.log("Download Completed");
            resolve();
          });
          filePath.on("error", (e) => {
            console.log("error", e);
            // reject()
          });
        });
      });
    };

    fileStream1 = fs.createReadStream(__dirname + "/files/file1.pdf");

    let result = await client.execute("pdf-to-text", {files: [fileStream1]});

    const tempPath = __dirname + "/files/temp.txt"
    
    await downloadFile(result[0].outputFileUrl, tempPath);
    let data = fs.readFileSync(tempPath, "utf8");
    expect(data.substring(0, 31)).toBe("THE DECLARATION OF INDEPENDENCE");
    fs.unlinkSync(tempPath)
  });
});