const fs = require("fs");
require("dotenv").config();
const Client = require("../src/classes/client");
const FormData = require("form-data");
const https = require("https");
const createFormData = require("../src/utils");

const stream1 = fs.createReadStream(__dirname + "/files/file1.pdf");
const stream2 = fs.createReadStream(__dirname + "/files/chatgpt_icon.png");

const args = {
  inputFiles: [stream1, stream2],
  prompt: "prompt text",
};

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

describe("tests client", () => {
  beforeEach(() => {
    client = new Client();
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
    console.log(result);
    expect(result.length).toBe(1);
    expect(result[0].outputFileUrl.substring(0, 5)).toBe("https");
  });

  test("should include all args", () => {
    var data = new FormData();

    for (const [key, value] of Object.entries(args)) {
      createFormData(data, key, value);
    }

    expect(
      data._streams[0].split("filename")[1].split('"')[1].split('"')[0]
    ).toBe("file1.pdf");
    expect(
      data._streams[3].split("filename")[1].split('"')[1].split('"')[0]
    ).toBe("chatgpt_icon.png");
    expect(data._streams[7]).toBe("prompt text");
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
    let data = fs.readFileSync(tempPath, "utf8");
    let test = data.includes(
      "THE DECLARATION OF INDEPENDENCE" ||
        "Lorem ipsum" ||
        "Adobe Acrobat PDF Files"
    );
    expect(test).toBe(true);
    fs.unlinkSync(tempPath);

    await downloadFile(result[0].outputFileUrl, tempPath2);
    data = fs.readFileSync(tempPath2, "utf8");
    test = data.includes(
      "THE DECLARATION OF INDEPENDENCE" ||
        "Lorem ipsum" ||
        "Adobe Acrobat PDF Files"
    );
    expect(test).toBe(true);
    fs.unlinkSync(tempPath2);

    await downloadFile(result[0].outputFileUrl, tempPath3);
    data = fs.readFileSync(tempPath3, "utf8");
    test = data.includes(
      "THE DECLARATION OF INDEPENDENCE" ||
        "Lorem ipsum" ||
        "Adobe Acrobat PDF Files"
    );
    expect(test).toBe(true);
    fs.unlinkSync(tempPath3);
  });
});
