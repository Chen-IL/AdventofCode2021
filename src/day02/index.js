import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\r?\n/).map(
  row => row.split(' ').map((el, i) => i==0?el:parseInt(el))
);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((position, row) => {
    switch (row[0]) {
      case "forward":
        position[0] += row[1]
        break;
      case "down":
        position[1] += row[1]
        break;
      case "up":
        position[1] -= row[1]
        break;
    }
    return position
  }, [0,0]).reduce((acc, x) => acc * x);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((position, row) => {
    switch (row[0]) {
      case "forward":
        position[0] += row[1]
        position[1] += row[1] * position[2]
        break;
      case "down":
        position[2] += row[1]
        break;
      case "up":
        position[2] -= row[1]
        break;
    }
    return position
  }, [0,0,0]).reduce((acc, x, i) => i < 2 ? acc*x : acc);
};

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

run({
  part1: {
    tests: [
      { input: testInput, expected: 150 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
