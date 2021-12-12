import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(`\n`);

var map = {}

const countPaths = (partial) => {
  let curr = partial[partial.length - 1];
  if (curr == 'end') return 1;

  let nexts = map[curr];
  if (!nexts) return 0;
  let result = 0;
  for (const nxt of nexts){
    if (!(nxt == nxt.toLowerCase() && partial.includes(nxt)) && nxt != 'start') result += countPaths([...partial, nxt]);
  }
  return result;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  map = {}

  input.forEach(line => {
    let [first, second] = line.split('-');
    if (map[first]) map[first].push(second)
    else map[first] = [second];
    if (map[second]) map[second].push(first)
    else map[second] = [first];
  });

  return countPaths(['start']);
};

var small = new Map();

const countPaths2 = (partial, twice) => {
  let curr = partial[partial.length - 1];
  if (curr == 'end') return 1;

  let nexts = map[curr];
  if (!nexts) return 0;
  let result = 0;
  for (const nxt of nexts){
    if (nxt != 'start'){
      if (nxt == nxt.toLowerCase()){
        if (small.has(nxt)) {
          let visits = small.get(nxt);
          if ((twice && visits == 1) || visits == 2) continue;
          small.set(nxt, visits + 1)}
        else small.set(nxt, 1);
      }
      result += countPaths2([...partial, nxt], twice || small.get(nxt) == 2);
      if (nxt == nxt.toLowerCase()){
        small.set(nxt, small.get(nxt) - 1);
      }
    }
  }
  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  map = {}
  small.clear;

  input.forEach(line => {
    let [first, second] = line.split('-');
    if (map[first]) map[first].push(second)
    else map[first] = [second];
    if (map[second]) map[second].push(first)
    else map[second] = [first];
  });

  return countPaths2(['start'], false);
};

run({
  part1: {
    tests: [
      {
        input: `
          start-A
          start-b
          A-c
          A-b
          b-d
          A-end
          b-end
        `,
        expected: 10,
      },
      {
        input: `
          dc-end
          HN-start
          start-kj
          dc-start
          dc-HN
          LN-dc
          HN-end
          kj-sa
          kj-HN
          kj-dc
        `,
        expected: 19,
      },
      {
        input: `
          fs-end
          he-DX
          fs-he
          start-DX
          pj-DX
          end-zg
          zg-sl
          zg-pj
          pj-he
          RW-he
          fs-DX
          pj-RW
          zg-RW
          start-pj
          he-WI
          zg-he
          pj-fs
          start-RW
        `,
        expected: 226,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end
      `,
      expected: 36,
    },
    {
      input: `
        dc-end
        HN-start
        start-kj
        dc-start
        dc-HN
        LN-dc
        HN-end
        kj-sa
        kj-HN
        kj-dc
      `,
      expected: 103,
    },
    {
      input: `
        fs-end
        he-DX
        fs-he
        start-DX
        pj-DX
        end-zg
        zg-sl
        zg-pj
        pj-he
        RW-he
        fs-DX
        pj-RW
        zg-RW
        start-pj
        he-WI
        zg-he
        pj-fs
        start-RW
      `,
      expected: 3509,
    },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
