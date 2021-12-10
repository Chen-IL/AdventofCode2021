import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const linePoints = (line) => {
  const POINTS = new Map();
  POINTS.set(')', 3);
  POINTS.set(']', 57);
  POINTS.set('}', 1197);
  POINTS.set('>', 25137);
  
  const CLOSE = new Map();
  CLOSE.set('(', ')');
  CLOSE.set('[', ']');
  CLOSE.set('{', '}');
  CLOSE.set('<', '>');

  let stack = [];
  for (const c of line){
    if (CLOSE.has(c)) stack.push(c);
    else if (c != CLOSE.get(stack.pop())) return POINTS.get(c);
  }
  return 0;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.reduce((sum, line) => sum + linePoints(line), 0);
};

const autoComplete = (line) => {
  const POINTS = new Map();
  POINTS.set('(', 1);
  POINTS.set('[', 2);
  POINTS.set('{', 3);
  POINTS.set('<', 4);
  
  const CLOSE = new Map();
  CLOSE.set('(', ')');
  CLOSE.set('[', ']');
  CLOSE.set('{', '}');
  CLOSE.set('<', '>');

  let stack = [];
  for (const c of line){
    if (CLOSE.has(c)) stack.push(c);
    else if (c != CLOSE.get(stack.pop())) return 0;
  }
  
  return stack.reverse().reduce((sum, ch) => sum*5 + POINTS.get(ch), 0);
}

const median = (arr) => {
  return arr[Math.floor(arr.length/2)];
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  
  return median(input.map(l => autoComplete(l)).filter(p => p>0).sort((a,b) => a-b));
};

const testInput = `
  [({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
