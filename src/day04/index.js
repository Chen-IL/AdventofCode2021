import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n\n');

const checkBoard = (b, r, c) => {
  return (b[r].every(n => n==-1) || b.every(row => row[c] == -1));
}

const calculateBoard = (b) => {
  return b.reduce((allSum, row) => allSum + row.reduce((rowSum, num) => rowSum + (num>0?num:0), 0), 0);
}

const findInBoard = (b, draw) => {
  let r = -1
  let c = -1
  r = b.findIndex(row => {
    c = row.findIndex(num => num == draw);
    return c >= 0;
  })
  return [r,c];
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const draws = input[0].split(',').map(Number);
  const boards = input.slice(1).map(e => e.split('\n').map(el => el.trim().split(/\s+/g).map(Number)));
  
  let winner = -1;
  let i = 0;
  while (winner < 0){
    let draw = draws[i++]
    boards.forEach((b, index) => {
      let loc = findInBoard(b,draw);
      if (loc[0] >= 0){
        b[loc[0]][loc[1]] = -1;
        if (checkBoard(b, loc[0], loc[1])) {
          winner = index;
        }
      }
    })
  }

  return calculateBoard(boards[winner]) * draws[i-1];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const draws = input[0].split(',').map(Number);
  const boards = input.slice(1).map(e => e.split('\n').map(el => el.trim().split(/\s+/g).map(Number)));

  let i = 0;
  let found = false
  while (!found){
    let draw = draws[i++];
    let toRemove = []
    boards.forEach((b, index) => {
      let loc = findInBoard(b,draw);
      if (loc[0] >= 0){
        b[loc[0]][loc[1]] = -1;
        if (checkBoard(b, loc[0], loc[1])){
          if (boards.length > 1) {
            toRemove.push(index)
          }
          else {
            found = true
          }
        }
      }
    })
    toRemove.forEach((bIndex,rIndex) => {
      boards.splice(bIndex - rIndex, 1)
    })
  }

  return calculateBoard(boards[0]) * draws[i-1]
};

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

run({
  part1: {
    tests: [
      { input: testInput, expected: 4512 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testInput, expected: 1924 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
