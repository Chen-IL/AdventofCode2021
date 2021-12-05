import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\r?\n/);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let gammaArr = input.reduce((counter, row) => {
    row.split('').forEach((ch, i) => {
      counter[i] += ch=="1"?1:-1;
    })
    return counter
  }, Array(input[0].length).fill(0)).map(el => el>=0?1:0);
  
  let gamma = parseInt(gammaArr.join(''),2);
  let epsilon = parseInt(gammaArr.map(el => el==0?1:0).join(''),2);

  return gamma*epsilon;
};

const arrayBitCriteria = (arr, i, most) => {
  let count = arr.reduce((counter, element) => {
    return counter + (element.charAt(i) == '1' ? 1 : -1);
  }, 0);
  let digit;
  if (most) {
    digit = count>=0?'1':'0';
  }
  else {
    digit = count>=0?'0':'1';
  }
  return arr.filter(el => el.charAt(i) == digit);
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let oxyArray = Array.from(input);
  let co2Array = Array.from(input);

  let i = 0;
  while (oxyArray.length > 1){
    oxyArray = arrayBitCriteria(oxyArray, i, true);
    i++;
  }
  i = 0;
  while (co2Array.length > 1){
    co2Array = arrayBitCriteria(co2Array, i, false);
    i++;
  }
  return parseInt(oxyArray.join(''),2) * parseInt(co2Array.join(''),2);
};

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

run({
  part1: {
    tests: [
      { input: testInput, expected: 198 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 230 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
