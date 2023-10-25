require("dotenv").config();
const Client = require("../src/classes/client");

describe("tests client", () => {
  beforeEach(() => {
    client = new Client();
    client.setApiKey(process.env.IKALAS_API_KEY);
  });

  test("simple remote call", async () => {
    let result = await client.execute("batch-wallet-generator", {
      numberOfWallets: "10",
    });
    console.log(result);
    expect(result.length).toBe(10);
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
});
