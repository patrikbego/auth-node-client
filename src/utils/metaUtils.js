const mdSpecialCharArray = ['#', '*', '_', '>', '-',
  '\\', '`', '{', '}', '[', ']', '(', ')',
  '#', '+', '-', '.', '!'];

function removeAllMdSpecialCharacters(data) {
  for (let i = 0; i < mdSpecialCharArray.length; i++) {
    const sc = mdSpecialCharArray[i];
    if (data.includes(sc)) data = data.replaceAll(sc, '');
  }
  return data;
}

export function parseTitle(data) {
  return removeAllMdSpecialCharacters(data.split('\n')[0]);
}
export function parseDescription(data) {
  return removeAllMdSpecialCharacters(data.substring(0, 100));
}
export function parse1stImage(data) {
  const firstImageTag = data.indexOf('(http') + 1;
  return data.substring(firstImageTag, data.indexOf(')', firstImageTag));
}
export function parseKeywords(data) {
  return removeAllMdSpecialCharacters(data);
}

export function parseMetaData(data, shareUrl) {
  const meta = {};
  if (data) {
    meta.title = parseTitle(data);
    meta.shareUrl = shareUrl;
    meta.description = parseDescription(data);
    meta.keyWords = parseKeywords(data);
    meta.image = parse1stImage(data);
  }
  return meta;
}
