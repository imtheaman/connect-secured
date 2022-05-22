// import { useState } from 'react';

// const getItem = (key: string) =>
//   document.cookie.split(';').reduce((total, currentCookie) => {
//     const item = currentCookie.split('=');
//     const storedKey = item[0];
//     const storedValue = item[1];

//     return key === storedKey ? decodeURIComponent(storedValue) : total;
//   }, '');

// const setItem = (keys: string[], values: string[], numberOfDays: number) => {
//   const expires = new Date().getTime() + numberOfDays * 24 * 60 * 60 * 1000;
//   const date = new Date(expires).toUTCString;
//   keys.forEach((key, index) => {
//     document.cookie += `${key}=${values[index]}; expires=${date}; path=/`;
//   });
//   return document.cookie;
// };

// const useCookie = () => {
//   const [cookie, cookieSet] = useState('');
//   const getCookie = (key: string) => getItem(key);
//   const setCookie = (
//     keys: string[],
//     values: string[],
//     numberOfDays: number
//   ) => {
//     const updatedCookie = setItem(keys, values, numberOfDays);
//     cookieSet(updatedCookie);
//   };

//   return [getCookie, setCookie];
// };

// export default useCookie;
export default {}