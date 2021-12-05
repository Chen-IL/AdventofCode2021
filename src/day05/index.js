import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\r?\n/).map(e => e.split(" -> ").map(el => el.split(',').map(Number)))

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  
  let lines = input.filter(line => (line[0][0] == line[1][0] || line[0][1] == line[1][1]))
    .map(line => line.sort((a,b) => a[0]-b[0]+a[1]-b[1]));
  
  let dots = new Map();
  let result = 0;

  lines.forEach(line => {
    let dir = (line[0][0] == line[1][0]) ? 1 : 0;
    let current = line[0];
    while (current[dir] <= line[1][dir]){
      let coded = `${current[0]},${current[1]}`;
      if (!dots.has(coded)){
        dots.set(coded, 1);
      }
      else {
        let prev = dots.get(coded);
        result += (prev==1)?1:0;
        dots.set(coded, prev+1);
      }
      current[dir] += 1;
    }
  })

  return result;
};

const advance = (curr, goal) => {
  if (curr[0] == goal[0] && curr[1] != goal[1]){
    return [curr[0], curr[1] + ((curr[1]<goal[1]) ? 1 : -1)];
  }
  else if (curr[0] != goal[0] && curr[1] == goal[1]){
    return [curr[0] + ((curr[0]<goal[0]) ? 1 : -1), curr[1]];
  }
  else if (curr[0] == goal[0] && curr[1] == goal[1]){
    return [-1, -1];
  }
  else{
    return [curr[0] + ((curr[0]<goal[0]) ? 1 : -1), curr[1] + ((curr[1]<goal[1]) ? 1 : -1)];
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let dots = new Map();
  let result = 0;

  input.forEach(line => {
    let current = line[0];
    let finish = line[1];
    while (true){
      let coded = `${current[0]},${current[1]}`;
      if (!dots.has(coded)){
        dots.set(coded, 1);
      }
      else {
        let prev = dots.get(coded);
        result += (prev==1)?1:0;
        dots.set(coded, prev+1);
      }
      current = advance(current, finish);
      if (current[0] == -1) break;
    }
  })  

  return result;
};

const testInput = `
  0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2
`;

run({
  part1: {
    tests: [
      { input: testInput, expected: 5 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 12 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
