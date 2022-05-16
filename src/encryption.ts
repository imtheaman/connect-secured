//@ts-ignore
import { SHA256 } from 'crypto-js';
import { Crypt, RSA } from 'hybrid-crypto-js';

const rsa = new RSA();
const crypt = new Crypt({
  md: 'sha512',
  aesStandard: 'AES-CBC',
  rsaStandard: 'RSA-OAEP',
});

export const genKeyPair = async () => {
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
  encryptedMsg: string
) => {
  const decrypted = await crypt.decrypt(privateKey, encryptedMsg);
  const verified = await crypt.verify(
    issuerPublicKey,
    decrypted.signature,
    decrypted.message
  );
  return verified ? decrypted : 'Signature not verified';
};

export const hash = (input: string) => SHA256(input).toString();
