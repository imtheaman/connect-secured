import * as CryptoJS from "crypto-js";

// Methods for the encrypt and decrypt Using AES
export const encryptUsingAES256 = (enc: any, secret: string) => {
  const key = CryptoJS.enc.Utf8.parse(secret);
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(JSON.stringify(enc)),
    key,
    {
      keySize: 128 / 8,
      iv: key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

export const decryptUsingAES256 = (dec: any, secret: string) => {
  const key = CryptoJS.enc.Utf8.parse(secret);
  const decrypted = CryptoJS.AES.decrypt(dec, key, {
    keySize: 128 / 8,
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
