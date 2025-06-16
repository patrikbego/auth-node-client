export function errorWrapper(res) {
  let errorMesssages = '';
  if (res && res.errors) {
    for (const error of res.errors) {
      errorMesssages += `${error.param}: ${error.msg}\n`;
    }
    return { errors: errorMesssages };
  }
  return res;
}
