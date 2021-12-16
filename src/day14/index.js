import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n\n');

/* Initial Solution

const oneStep1 = (before, rules) => {
  let result = [];
  for (let i = 0; i < before.length - 1; i++){
    result.push(before[i]);
    let pair = before.slice(i, i+2).join('');
    if (rules.has(pair)) result.push(rules.get(pair)); 
  }
  result.push(before[before.length-1]);
  return result;
};

const quantize = (arr) => {
  let counts = {};
  arr.forEach(ch => counts[ch] = counts[ch] ? counts[ch] + 1 : 1);
  let cArr = Object.values(counts).sort((a,b) => a-b);
  return cArr[cArr.length-1] - cArr[0];
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let initial = input[0].split('');
  let rules = new Map();
  input[1].split('\n').map(e => e.split(" -> ")).forEach(e => {
    rules.set(e[0], e[1]);
  });

  const STEPS = 10;
  let current = [...initial];
  for (let step = 0; step < STEPS; step++) {
    current = oneStep1(current, rules);
  };
  
  return quantize(current);
};

*/

const part1 = (rawInput) => part2(rawInput, 10);

const oneStep2 = (pairs, rules) => {
  let result = new Map();
  pairs.forEach((count, pair) => {
    let newPairs = [
      pair.charAt(0).concat(rules.get(pair)),
      rules.get(pair).concat(pair.charAt(1))
    ];
    newPairs.forEach(newPair => {
      if (result.has(newPair)) result.set(newPair, result.get(newPair) + count)
      else result.set(newPair, count);
    });
  });
  return result;
};

const quantize2 = (pairs, az) => {
  let counts = new Map();
  pairs.forEach((count, pair) => {
    pair.split('').forEach(ch => {
      if (counts.has(ch)) counts.set(ch, counts.get(ch) + count)
      else counts.set(ch, count);
    });
  });
  counts.forEach((count, ch) => {
    if (az.includes(ch)) counts.set(ch, (count-1)/2 + 1)
    else counts.set(ch, count/2);
  });

  let cArr = Object.values(Object.fromEntries(counts)).sort((a,b) => a-b);
  return cArr[cArr.length-1] - cArr[0];
};

const part2 = (rawInput, steps=40) => {
  const input = parseInput(rawInput);
  let rules = new Map();
  input[1].split('\n').map(e => e.split(" -> ")).forEach(e => {
    rules.set(e[0], e[1]);
  });
  let current = new Map();
  let az = [input[0].charAt(0), input[0].charAt(input[0].length-1)];
  for (let i = 0; i < input[0].length - 1; i++){
    let pair = input[0].slice(i,i+2);
    if (current.has(pair)) current.set(pair, current.get(pair) + 1)
    else current.set(pair, 1);
  };
  
  for (let step = 0; step < steps; step++) {
    current = oneStep2(current, rules);
  };

  return quantize2(current, az);
};

const testInput = `
  NNCB

  CH -> B
  HH -> N
  CB -> H
  NH -> C
  HB -> C
  HC -> B
  HN -> C
  NN -> C
  BH -> H
  NC -> B
  NB -> B
  BN -> B
  BB -> N
  BC -> B
  CC -> N
  CN -> C
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 1588,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 2188189693529,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
