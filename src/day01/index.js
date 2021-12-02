import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\r?\n/).map(Number);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((result,val,i,arr) => {
    if (i==0) return 0;
    if (val > arr[i-1]) return result + 1;
    return result;
  }, 0)
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((result,val,i,arr) => {
    if (i<3) return 0;
    if (val > arr[i-3]) return result+1;
    return result;
  }, 0);
};

const testInput = `199
  200
  208
  210
  200
  207
  240
  269
  260
  263`

run({
  part1: {
    tests: [
      { input: testInput , expected: 7 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 5 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
