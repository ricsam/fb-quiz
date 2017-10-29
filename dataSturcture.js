const treeData = {
  h: {
    e: {
      l: {
        l: {
          o: {
            tags: 'id5',
          },
          p: {
            tags: 'id4',
          },
          tags: 'id3',
        },
        tags: 'id2',
      },
      tags: 'id1',
    },
    tags: 'id0',
  },
  f: {
    e: {
      l: {
        l: {
          tags: 'id6',
        },
        tags: 'id7',
      },
      tags: 'id8',
    },
    tags: 'id9',
  },
};
const tags = {
  'tid0': {
    key: 'hello',
    duplicates: 0,
  },
  'tid1': {
    key: 'hell',
    duplicates: 0,
  }
};
const mutations = [
  'mid0': 'fell',
]; /* might be duplicates, e.g. felp as a word with p -> l mutation */

const synonyms = [
  'hell': ['mid0']
];
const tagIndex = [
  'hello': 'tid0',
  'hell': 'tid1',
];
/* tags, [tag, distance] sorted by distance */
const treeIndex = {
  id0: ['r0', 'u0'],
  id1: ['r1', 'u1'],
  id2: ['r2', 'u2'],
  id3: ['r3', 'u3'],
  id4: ['r4', 'u4'],
  id5: ['r5', 'u5'],
  id6: ['r6', 'u6'],
  id7: ['r7', 'u7'],
  id8: ['r8', 'u8'],
  id9: ['r9', 'u9'],
};
const treeCollectionData = {
  'r0': { id: 'tid1', distance: 3 },
  'r1': { id: 'tid1', distance: 2 },
  'r2': { id: 'tid1', distance: 1 },
  'r3': { id: 'tid1', distance: 0 },
  'r4': { id: 'tid0', distance: 1 },
  'r5': { id: 'tid0', distance: 0 },
  'r6': { id: 'tid1', distance: 1 },
  'r7': { id: 'tid1', distance: 2 },
  'r8': { id: 'tid1', distance: 3 },
  'r9': { id: 'tid1', distance: 4 },
  'u0': { id: 'tid0', distance: 4 },
  'u1': { id: 'tid0', distance: 3 },
  'u2': { id: 'tid0', distance: 2 },
  'u3': { id: 'tid0', distance: 1 },
  'u4': { id: 'tid1', distance: 1 },
  'u5': { id: 'tid1', distance: 1 },
  'u6': { id: 'tid0', distance: 2 },
  'u7': { id: 'tid0', distance: 3 },
  'u8': { id: 'tid0', distance: 4 },
  'u9': { id: 'tid0', distance: 5 },
};



function find(word) {
  var base = tree;
  var run = true;
  for (var i = 0; i < word.length && run; i++) {
    if (has(base, word[i])) {
      base = base[word[i]];
    } else {
      run = false;
    }
  }
  return index[base.tags[]];
}