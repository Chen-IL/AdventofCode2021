import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(row => row.split('').map(Number));

const runPart = (rawInput, partNum) => {
  var map = parseInput(rawInput);
  const STEPS = (partNum==1)?100:999999;
  const CELLS = map.length * map[0].length;
  
  var flashes = 0;
  var toFlash = [];
  for (let step = 0; step < STEPS; step++){
    let prevFlashes = flashes;
    map = map.map((row, r) => row.map((cell, c) => {
      if (cell == 9) toFlash.push([r,c]);
      return cell+1;
    }));

    while (toFlash.length>0){
      let [r,c] = toFlash.pop();
      if (map[r][c] == 0) continue;
      flashes++;
      map[r][c] = 0;
      for (let nR = r-1; nR <= r+1; nR++){
        for (let nC = c-1; nC <= c+1; nC++){
          if (nR >=0 && nR < map.length && nC >= 0 && nC < map[0].length && map[nR][nC] > 0){
            map[nR][nC]++;
            if (map[nR][nC] > 9) toFlash.push([nR,nC]);
          }
        }
      }
    }
    if (partNum == 2 && flashes == CELLS + prevFlashes) return step+1;
  }

  return flashes;
};

const part1 = (rawInput) => {
  return runPart(rawInput,1);
};

const part2 = (rawInput) => {
  return runPart(rawInput,2);
};

const testInput = `
  5483143223
  2745854711
  5264556173
  6141336146
  6357385478
  4167524645
  2176841721
  6882881134
  4846848554
  5283751526
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 195,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
