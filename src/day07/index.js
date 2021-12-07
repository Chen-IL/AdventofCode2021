import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(',').map(Number);

const bothParts = (rawInput, func) => {
  const input = parseInput(rawInput);
  
  let result = -1;
  for (let position = Math.min(...input); position <= Math.max(...input); position++) {
    let fuel = input.reduce((res, num) => res + func(Math.abs(position-num)), 0);
    if (result == -1) {result = fuel;}
    else {result = Math.min(result, fuel);}
  }

  return result;
}

const part1 = (rawInput) => {
  return bothParts(rawInput, x => x);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return bothParts(rawInput, x => Math.floor(x*(x+1)/2));
};

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 168,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
