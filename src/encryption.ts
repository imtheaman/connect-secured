//@ts-ignore
import { Crypt, RSA } from "hybrid-crypto-js";

const rsa = new RSA();
const crypt = new Crypt({
  md: "sha512",
  aesStandard: "AES-CBC",
  rsaStandard: "RSA-OAEP",
});

export const genKey = async () => {
  return await rsa.generateKeyPairAsync();
};

export const encrypted = async (
  msg: string,
  issuerPrivateKey: string,
  receiverPublicKeys: [string]
) => {
  const signature = await crypt.signature(issuerPrivateKey, msg);
  return await crypt.encrypt([receiverPublicKeys], msg, signature);
};

export const decrypted = async (
  issuerPublicKey: string,
  privateKey: string,
  encrypted: string
) => {
  const decrypted = await crypt.decrypt(privateKey, encrypted);
  await crypt.verify(issuerPublicKey, decrypted.signature, decrypted.message);
};
