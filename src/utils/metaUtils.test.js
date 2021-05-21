import { fireEvent } from '@testing-library/react';
import {
  parse1stImage,
  parseDescription,
  parseKeywords,
  parseMetaData,
  parseTitle,
} from './metaUtils';

const mockData = '# Add/edit article nr1\n'
      + '\n'
      + 'Add article\n'
      + '+ edit test1\n'
      + '\n'
      + '"><script >alert(document.cookie)</script >\n'
      + '"><ScRiPt>alert(document.cookie)</ScRiPt>\n'
      + '"%3cscript%3ealert(document.cookie)%3c/script%3e\n'
      + '\n'
      + "<b onmouseover=alert('Wufff!')>click me!</b>\n"
      + '\n'
      + '<img src="http://url.to.file.which/not.exist" onerror=alert(document.cookie);>\n'
      + '\n'
      + '\n'
      + '![sun power](https://upload.wikimedia.org/wikipedia/commons/9/90/Sunpower_logo.svg)\n'
      + '\n';

const mockData1 = '';

const mockData2 = '#Test 1\n'
      + '"><script >alert(document.cookie)</script >\n'
      + '"><ScRiPt>alert(document.cookie)</ScRiPt>\n)'
      + '![](https://test)\n'
      + '![](https://upload.wikimedia.org/wikipedia/commons/9/90/Sunpower_logo.svg)\n'
      + '\n';

test('test parseTitle', () => {
  expect(parseTitle(mockData)).toBe(' Add/edit article nr1');
  expect(parseTitle(mockData1)).toBe('');
  expect(parseTitle(mockData2)).toBe('Test 1');
});
test('test parseDescription', () => {
  expect(parseDescription(mockData)).toBe(' Add/edit article nr1\n'
      + '\n'
      + 'Add article\n'
      + ' edit test1\n'
      + '\n'
      + '"<script alertdocumentcookie</script \n'
      + '"<ScR');
  expect(parseDescription(mockData1)).toBe('');
  expect(parseDescription(mockData2)).toBe('Test 1\n'
  + '"<script alertdocumentcookie</script \n'
  + '"<ScRiPtalertdocumentcookie</ScRiPt\n'
  + 'h');
});

test('test parse1stImage', () => {
  expect(parse1stImage(mockData)).toBe('https://upload.wikimedia.org/wikipedia/commons/9/90/Sunpower_logo.svg');
  expect(parse1stImage(mockData1)).toBe('');
  expect(parse1stImage(mockData2)).toBe('https://test');
});

test('test parseKeywords', () => {
  const data = '# test1#test2 # test4';
  const data1 = '';
  const data2 = ' ## test1#test2 # test4';
  expect(parseKeywords(data)).toBe(' test1test2  test4');
  expect(parseKeywords(data1)).toBe('');
  expect(parseKeywords(data2)).toBe('  test1test2  test4');
});

test('test parse metadata', () => {
  const data = parseMetaData(mockData);
  expect(data.title).toBe(' Add/edit article nr1');
  expect(data.description).toBe(' Add/edit article nr1\n'
      + '\n'
      + 'Add article\n'
      + ' edit test1\n'
      + '\n'
      + '"<script alertdocumentcookie</script \n'
      + '"<ScR');
  expect(data.image).toBe('https://upload.wikimedia.org/wikipedia/commons/9/90/Sunpower_logo.svg');
});
