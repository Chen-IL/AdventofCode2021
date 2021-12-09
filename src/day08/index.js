import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(e => e.split(" | ").map(el => el.split(' ')));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.flatMap(e => e[1]).filter(e => (e.length <= 4 || e.length == 7)).length;
};

const wireMapping = (patterns) => {
  let wires = new Map();
  let lenOfPattern = new Array(6).fill(0).map(e => []);
  patterns.forEach(e => {lenOfPattern[e.length-2].push(e);});
  
  let temp = lenOfPattern[0][0].split(''); //looking at 1. wires are 'c' or 'f'

  for (const ch of lenOfPattern[1][0]){ //looking at 7
    if (!temp.includes(ch)){
      wires.set(ch, 'a');
    }
  }

  for (const word of lenOfPattern[4]){ //looking for 6
    if (word.includes(temp[0]) != word.includes(temp[1])){
      if (word.includes(temp[0])){
        wires.set(temp[0], 'f');
        wires.set(temp[1], 'c');
      }
      else {
        wires.set(temp[0], 'c');
        wires.set(temp[1], 'f');
      }
      lenOfPattern[4] = lenOfPattern[4].filter(e => e != word);
      break;
    }
  }

  for (const ch of lenOfPattern[2][0]){ //looking at 4
    if (!temp.includes(ch)){
      temp.push(ch);
    }
  }
  
  for (const word of lenOfPattern[4]){ //looking for 0
    if (word.includes(temp[2]) != word.includes(temp[3])){
      if (word.includes(temp[2])){
        wires.set(temp[2], 'b');
        wires.set(temp[3], 'd');
      }
      else {
        wires.set(temp[2], 'd');
        wires.set(temp[3], 'b');
      }
      lenOfPattern[4] = lenOfPattern[4].filter(e => e != word);
      break;
    }
  }

  temp = 'abcdefg'.split('').filter(ch => !wires.has(ch));
  
  if (lenOfPattern[4][0].includes(temp[0])){ //looking at 9
    wires.set(temp[0], 'g');
    wires.set(temp[1], 'e');
  }
  else {
    wires.set(temp[0], 'e');
    wires.set(temp[1], 'g');
  }
  
  return wires;
}

const strToDigit = new Map();
strToDigit.set("abcefg", 0);
strToDigit.set("cf", 1);
strToDigit.set("acdeg", 2);
strToDigit.set("acdfg", 3);
strToDigit.set("bcdf", 4);
strToDigit.set("abdfg", 5);
strToDigit.set("abdefg", 6);
strToDigit.set("acf", 7);
strToDigit.set("abcdefg", 8);
strToDigit.set("abcdfg", 9);


const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.map(line => {
    let wires = wireMapping(line[0]);
    return line[1].map(
      wrong => strToDigit.get(wrong.split('').map(wr => wires.get(wr)).sort().join(''))
    );
  }).map(line => line.join('')).map(Number).reduce((sum, curr) => sum + curr);
};

const testInput = `
  be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
  edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
  fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
  fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
  aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
  fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
  dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
  bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
  egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
  gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
