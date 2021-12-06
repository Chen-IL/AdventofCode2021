import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(',').map(Number);

const simulate = (rawInput, days) => {
  const input = parseInput(rawInput);

  let fish = new Array(9).fill(0);
  input.forEach(el => {fish[el]++;});

  for (let day = 0; day < days; day++) {
    let birthing = fish[0];
    fish = fish.map((v,i,arr) => {
      if (i < 6 || i == 7){
        return arr[i+1];
      }
      if (i==6){
        return arr[7] + birthing;
      }
      if (i==8){
        return birthing;
      }
    })
  }


  return fish.reduce((sum, curr) => sum + curr);
};

const part1 = (rawInput) => {
  return simulate(rawInput, 80);
};

const part2 = (rawInput) => {
  return simulate(rawInput, 256);
};

const testInput = `3,4,3,1,2`;

run({
  part1: {
    tests: [
      { input: testInput, expected: 5934 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 26984457539 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
