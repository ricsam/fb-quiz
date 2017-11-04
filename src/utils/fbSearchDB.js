function has(obj, what) {
  return Object.prototype.hasOwnProperty.call(obj, what);
}

export async function saveTrie(db, word, options) {
  const tag = options.tag || word;
  let distance = options.distance || 0;

  /* default distance for searching ""
     in the word should be the length of
     the word + some predefined error
     e.g. distance "" to heljo/hello
     should be 1 + 5 */
  distance = distance + tag.length;

  const batch = db.batch();
  const index = db.collection("index");
  const tagsIndex = db.collection('tags');
  const tagIndex = tagsIndex.doc(tag);

  const tagRes = await tagIndex.get();
  let duplicates = 0;

  const variants = {
    [tag]: true,
    [word]: true
  };

  if (tagRes.exists && has(tagRes.data(), 'duplicates')) {
    duplicates = tagRes.data().duplicates + 1;
  }

  let tree = '/index/tree'; /* document */
  const generateSubTree = [];
  const docRefs = {};

  /* READ */
  let newBranch = false;
  for (let i = 0; i < word.length; i++) {
    console.log(tree);
    const letter = word[i];
    const base = tree + '/' + letter; /* collection */
    let nextTree;

    const nextTreeSnapshot = !newBranch ? await db.doc(tree).get() : false;
    if ( newBranch || !nextTreeSnapshot.exists ) { /* this will be a new branch as subtree does not exist */
      newBranch = true;
      nextTree = '/index/' + db.collection('/index').doc().id; /* generate new id */
      generateSubTree.push(i);
    } else {
      const nextTreeRef = nextTreeSnapshot.get('tree'); /* reference to document */
      nextTree = '/index/' + nextTreeRef.id;
    }
    docRefs[i] = {previousTree: tree, nextTree, base};
    tree = nextTree;
  }

  /* WRITE */
  await Promise.all(generateSubTree.map(letterIndex => {
    const {previousTree, nextTree} = docRefs[letterIndex];
    console.log(previousTree, nextTree);
    return batch.set(db.doc(previousTree), {
      tree: db.doc(nextTree)
    });
  }));

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const { base } = docRefs[i];

    await batch.set(db.collection(base).doc(tag), {
      tag: tagIndex,
      distance: distance - (i + 1)
    });
  }


  await batch.set(tagIndex, {
    duplicates,
    variants
  }, {merge: true});

  return batch.commit();
}

export async function search(db, word) {
  let tree = '/index/tree';
  let result = false;
  let prevTree = false;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    const snapshot = await db.doc(tree).get(); /* used to check if the edge has a tree field key */
    if ( !snapshot.exists ) {
      if (prevTree) {
        return {
          result: prevTree,
        };
      } else {
        return {
          result: false,
          message: '0 results found',
        };
      }
    } else {
      prevTree = tree; /* save as previous tree */
      result = prevTree + '/' + letter;
      const nextTreeRef = snapshot.get('tree');
      tree = /index/ + nextTreeRef.id;
    }
  }

  const documents = await db.collection(result).get();

  return {
    path: db.doc(tree),
    result: documents.docs.map(snapshot => ({data: snapshot.data(), meta: snapshot.metadata, query: snapshot.query, snapshot, id: snapshot.id })),
  };
}