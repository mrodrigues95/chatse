'use server';

import { cookies as nextCookies } from 'next/headers';
import setCookie from 'set-cookie-parser';

const API_COOKIE = 'chatse_identity';

export const trySetIdentityCookie = (response: Response) => {
  const cookies = setCookie.parse(response.headers.getSetCookie(), { map: true });
  if (API_COOKIE in cookies) {
    console.log('Setting identity cookie', cookies[API_COOKIE]);
    // @ts-expect-error: Next isn't exporting `ResponseCookie`.
    nextCookies().set({ ...cookies[API_COOKIE] });
  }
};

export const tryRemoveIdentityCookie = () => {
  nextCookies().delete(API_COOKIE);
};
