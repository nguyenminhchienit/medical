export function convertPhoneNumber(phoneNumber) {
  // Kiểm tra nếu số điện thoại bắt đầu bằng '0'
  if (phoneNumber.startsWith("0")) {
    // Thay thế '0' ở đầu bằng '+84'
    return "+84" + phoneNumber.slice(1);
  }
  // Nếu số điện thoại không bắt đầu bằng '0', trả về số gốc
  return phoneNumber;
}
