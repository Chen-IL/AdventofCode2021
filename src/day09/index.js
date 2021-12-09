import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(e => e.split('').map(Number));

const lowPoint = (map,r,c) => {
  if (r > 0 && map[r-1][c] <= map[r][c]) return false;
  if (r < map.length-1 && map[r+1][c] <= map[r][c]) return false;
  if (c > 0 && map[r][c-1] <= map[r][c]) return false;
  if (c < map[0].length-1 && map[r][c+1] <= map[r][c]) return false;
  return true;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((sum, row, r, arr) => {
    return sum + row.reduce((rowSum, cell, c) => {
      return rowSum + (lowPoint(arr, r, c)?(cell+1):0);
    },0)
  },0);
};

const handlePoint = (map, r, c, queue) => {
  if (map[r][c] < 9){
    queue.push([r,c]);
    map[r][c] = 10;
    return 1;
  }
  return 0;
}

const findBasin = (map, rc) => {
  let size = 1;
  let queue = [rc];
  map[rc[0]][rc[1]] = 10;
  while (queue.length){
    let [r,c] = queue.shift();
    if (r > 0) size += handlePoint(map, r-1, c, queue);
    if (r < map.length-1) size += handlePoint(map, r+1, c, queue);
    if (c > 0) size += handlePoint(map, r, c-1, queue);
    if (r < map[0].length-1) size += handlePoint(map, r, c+1, queue);
  }
  return size;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  
  return input.flatMap((row, r, arr) => {
    return row.map((cell, c) => {
      return lowPoint(arr,r,c)?[r,c]:null;
    }).filter(e => e)
  }).filter(e => e.length)
  .map(rc => findBasin(input,rc)).sort((a,b) => a-b).slice(-3)
  .reduce((res,curr) => res*curr);
};

const testInput = `
  2199943210
  3987894921
  9856789892
  8767896789
  9899965678
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
