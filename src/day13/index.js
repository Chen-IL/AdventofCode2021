import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n\n').map((v,i) => 
  i==0?v.split('\n'):
  v.split('\n').map(r => r.split(' ')[2].split('=').map((e,j) => j==0?e:parseInt(e)))
);

const fold = (p, axis) => {
  let line = axis[1];
  let index = axis[0]=='y' ? 1 : 0; 
  p.forEach(xy => {
    let point = xy.split(',').map(Number);
    if (point[index] > line){
      point[index] = 2*line - point[index];
      p.delete(xy);
      p.add(point.join(','));
    }
  });
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let points = new Set();
  input[0].forEach(str => points.add(str));
  
  fold(points, input[1][0])
  return points.size;
};

const printPaper = (p) => {
  let arr = Array.from(p).map(e => e.split(',').map(Number));
  let maximal = arr.reduce((m, point) => {
    if (point[0] > m[0]) m[0] = point[0];
    if (point[1] > m[1]) m[1] = point[1];
    return m;
  }, [0,0]);
  let area = new Array(maximal[1]+1).fill(null).map(() => new Array(maximal[0]+1).fill('.'));
  arr.forEach(xy => area[xy[1]][xy[0]] = '#');

  console.log(area.map(e => e.join('')).join('\n'));
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let points = new Set();
  input[0].forEach(str => points.add(str));
  
  input[1].forEach(fld => fold(points, fld));
  printPaper(points);
  // return "RLBCJGLU";
};

const testInput = `
  6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0

  fold along y=7
  fold along x=5
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 17,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
