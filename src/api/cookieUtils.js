export function getCookie(cName) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const name = `${cName}=`;
  const cDecoded = decodeURIComponent(document.cookie);
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

export function deleteCookie() {
  // TODO make a server call to check if policy has been updated (if yes delete the cookie)
  if (typeof window !== 'undefined') {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }
}

export function setCookie(cName, cValue, expDays) {
  if (typeof window !== 'undefined') {
    const date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`;
  }
}
