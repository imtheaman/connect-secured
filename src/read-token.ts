import { enc } from 'crypto-js';

export const readJwt = (token: string) => {
  const payload = token.split('.')[1];
  const encoded = enc.Base64url.parse(payload);
  const data = enc.Utf8.stringify(encoded);
  return data;
};