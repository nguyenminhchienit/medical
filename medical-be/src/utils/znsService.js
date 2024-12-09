const axios = require("axios");
const crypto = require("crypto");

// Config thông tin ứng dụng từ Zalo
const APP_ID = "3743580504765137994";
const APP_SECRET = "xCSojwQMxGjmX3Ri8755";
const TEMPLATE_ID = "376137";
const ZALO_API_URL = "https://business.openapi.zalo.me/message/template";

// Tạo chữ ký cho API Zalo
function createSignature(data) {
  const hmac = crypto.createHmac("sha256", APP_SECRET);
  hmac.update(JSON.stringify(data));
  return hmac.digest("hex");
}

// Gửi tin nhắn ZNS
async function sendZnsMessage(phone, data) {
  console.log({ phone, data });
  const requestData = {
    phone, // Số điện thoại người nhận
    template_id: TEMPLATE_ID, // Template ID
    template_data: data, // Dữ liệu template (như tên khách hàng, thông tin sản phẩm,...)
  };

  const signature = createSignature(requestData);

  try {
    const response = await axios.post(ZALO_API_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
        access_token:
          "pSyZJtqy42t9oIP3UZyLACt8Aajz9c5wljG9ULHjU7Jbw0j13M58NE7f2tGHVLX6eFuNQaffKtJtvY8QEqj12jh9DI8wFty9awes2pevVodzk2qrDWyUAl6QQIT4CXeIihynUK8W0r60kZTwLa88LwlKEsTtRWzYcPzyVrKJ76ATlcnQMmWXSx2R5nnC72W4c8eS76amI27Pbo8Y5WLH2k2Y9c5MK15QgjT1DHrT1HVMgKO21JaG3hcrSpPvCHq3nAbwAN94EGEipsqLSMvOBhxK63TqN5WKoDThFILV61tb_KSp24q89yBAL4KGOsSlxDCfC2ebS0JAXnKxBN1HBT7p0aujMMCv_VSh51zTUZRy-XuOBtTg9lhJDXSxG7KiqyTA4MLWEG-kuMvi4tSOKgF0LajNLuJ01bfz8HOY",
        mac: signature,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error sending ZNS:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = { sendZnsMessage };
