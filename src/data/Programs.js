export const PROGRAMS = [
  `
function main() {
  console.log("Hello world!");
}
main();
  `,
  `
let value1 = 'one';
let value2 = 'two';

// original values
console.log('original', value1);
console.log('original', value2);

// swapping values
let value3 = value1;
value1 = value2;
value2 = value3;

console.log('swap', value1);
console.log('swap', value2);
  `,
  `
function findMaxNumber(num1, num2) {
  return (num1 > num2) ? num1 : num2;
}

let checkMax1 = findMaxNumber(10, 5);
console.log('Max Number:', checkMax1);

let checkMax2 = findMaxNumber(10, 15);
console.log('Max Number:', checkMax2);

let checkMax3 = findMaxNumber(100, 100);
console.log('Max Number:', checkMax3);
  `,
  `
function isLandscape(width, height) {
  return (width > height);
}

let checkWidthHeight1 = isLandscape(800, 600);
console.log('Landscape:', checkWidthHeight1);

let checkWidthHeight2 = isLandscape(600, 800);
console.log('Landscape:', checkWidthHeight2);

let checkWidthHeight3 = isLandscape(1024, 768);
console.log('Landscape:', checkWidthHeight3);
  `,
  `
function isFizzBuzz(arg) {
  if(typeof arg !== 'number') {
    return ('Nan - Not a Number! Please Input Number');
  }
  
  if((arg % 3 === 0) && (arg % 5 === 0)) {
    return 'FizzBuzz';
  } else if(arg % 3 === 0) {
    return 'Fizz';
  } else if(arg % 5 === 0) {
    return 'Buzz';
  } else {
    return 'Some odd number entered: ' + arg;
  }
}
  `,
  `
const SPEEDLIMIT = 70;
const KMPERPOINT = 5;

function checkSpeedLimit(curSpeed) {
  if(curSpeed <= SPEEDLIMIT) {
    return ('Good Safe Driving!');
  } else {
    let penaltyPoint = Math.floor((curSpeed - SPEEDLIMIT) / KMPERPOINT);
    if(penaltyPoint < 10) {
      return ('Speed Limit Crossed by Penalty Point: ' + penaltyPoint);
    } else {
      return ('License Suspended!');
    }
  }
}
  `,
  `
function isOddEvenNumber(curLimit) {
  for(let i = 0; i <= curLimit; i++) {
    const alertMessage = (i % 2 === 0) ? 'EVEN' : 'ODD';
    console.log(i , alertMessage);
  }
}
  `,
  `
function checkCountTruthyFalsy(curArray) {
  let truthyCount = 0;
  
  for(let value of curArray) {
    if(value) {
      truthyCount++;
    }
  }
  return truthyCount;
}
  `,
  `
function showStringProperties(curObj) {
  for(let key in curObj) {
    if(typeof(curObj[key]) === 'string') {
      console.log(key,':', curObj[key]);
    }
  }
}
  `,
  `
function sumOfMultiples(curLimit) {

  let sumOfMultipleValue = 0;

  for(let i = 0; i <= curLimit; i++) {
    if(i % 3 === 0 || i % 5 === 0) {
      sumOfMultipleValue +=i;
    }
  }
  return sumOfMultipleValue;
}
  `,
  `
function showPattern(totalRowsPatternCount) {
  for(let curRow = 1; curRow <= totalRowsPatternCount; curRow++) {
    let patternDesign = '';
    for(let i = 0; i < curRow; i++) {
      patternDesign += '*';
    }
    console.log(patternDesign);
  }
}
  `,
  `
function calculateAverage(currentArray) {
  let total = 0;
  for(let curValue of currentArray) {
    total += curValue;
  }
  return (total / currentArray.length);
}

function calculateGrades(currentArray) { 
  const average = calculateAverage(currentArray);

  if(average < 70) return grade = 'D'; 
  if(average < 80) return grade = 'C';
  if(average < 90) return grade = 'B';
  if(average <= 100) return grade = 'A';
}
  `,
  `
function createBingoCard() {
  for(let i = 1; i <= 24; i++) {
    let newRandomNum = Math.floor(Math.random() * 75);
    document.getElementById('Square' + i).innerHTML = newRandomNum;
  }
}
  `,
  `
function showPrimeNumbers(numberLimit) {
  for(let curNum = 2; curNum <= numberLimit; curNum++) {
    if(isPrimeNumber(curNum)) {
      console.log('Prime Number:', curNum);
    }
  }
}

function isPrimeNumber(number) {
  for (let factor = 2; factor < number; factor++) {
    if(number % factor === 0) {
      return false;
    }
  }
  return true;
}
  `,
  `
function generateArrayFromRange(startNum, endNum) {
  const rangeArray = [];
  for(let curNum = startNum; curNum <= endNum; curNum++) {
    rangeArray.push(curNum);
  }
  return rangeArray;
}
  `,
  `
function includes(arrayToSearch, elementToSearch) {
  for(let curElement of arrayToSearch) {
    if(curElement === elementToSearch) {
      return true;
    } 
  }
  return false;
}
  `
];
