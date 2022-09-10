const UPPERCASE_CHAR_CODE = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODE = arrayFromLowToHigh(97, 122);

function generateRandomArchiveNumber() {
  const time = getTime();
  const randomString = generateRandomstring();

  const randomArchiveNumber = `${time}-${randomString}`;

  return randomArchiveNumber
}

function getTime() {
  const date = new Date().getDate();
  const getSecond = new Date().getSeconds();

  return `${date}${getSecond}`;
}

function generateRandomstring() {
  let charCodes = [...UPPERCASE_CHAR_CODE, ...LOWERCASE_CHAR_CODE];
  const randomCharacters = [];

  for (let i = 0; i < 4; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];

    randomCharacters.push(String.fromCharCode(characterCode));
  }

  return randomCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];

  for (let i = low; i <= high; i++) {
    array.push(i);
  }

  return array;
}


module.exports = generateRandomArchiveNumber
