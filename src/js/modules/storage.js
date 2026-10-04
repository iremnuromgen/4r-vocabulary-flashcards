const STORAGE_KEY = "flimo.collections";

export function getCollections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveCollections(collections) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
}

export function addCollection({ name, words }) {
  const collections = getCollections();

  const collection = {
    id: crypto.randomUUID(),
    name,
    words,
    knownWords: [],
    unknownWords: [],
    createdAt: new Date().toISOString(),
  };

  collections.unshift(collection);
  saveCollections(collections);

  return collection;
}

export function updateCollectionProgress(
  collectionId,
  knownWords,
  unknownWords
) {
  const collections = getCollections();

  const collection = collections.find(
    (collection) => collection.id === collectionId
  );

  if (!collection) return null;

  if (!Array.isArray(collection.knownWords)) {
    collection.knownWords = [];
  }

  if (!Array.isArray(collection.unknownWords)) {
    collection.unknownWords = [];
  }

  knownWords.forEach((word) => {
    collection.unknownWords = collection.unknownWords.filter(
      (item) => item.id !== word.id
    );

    const alreadyKnown = collection.knownWords.some(
      (item) => item.id === word.id
    );

    if (!alreadyKnown) {
      collection.knownWords.push(word);
    }
  });

  unknownWords.forEach((word) => {
    collection.knownWords = collection.knownWords.filter(
      (item) => item.id !== word.id
    );

    const alreadyUnknown = collection.unknownWords.some(
      (item) => item.id === word.id
    );

    if (!alreadyUnknown) {
      collection.unknownWords.push(word);
    }
  });

  saveCollections(collections);

  return collection;
}

export function resetCollectionProgress(collectionId, type) {
  const collections = getCollections();

  const collection = collections.find(
    (collection) => collection.id === collectionId
  );

  if (!collection) return null;

  if (type === "known") {
    collection.knownWords = [];
  }

  if (type === "unknown") {
    collection.unknownWords = [];
  }

  if (type === "all") {
    collection.knownWords = [];
    collection.unknownWords = [];
  }

  saveCollections(collections);

  return collection;
}

export function removeCollection(collectionId) {
  const collections = getCollections();

  const updatedCollections = collections.filter(
    (collection) => collection.id !== collectionId
  );

  if (updatedCollections.length === collections.length) {
    return false;
  }

  saveCollections(updatedCollections);

  return true;
}

export function updateCollection(collectionId, { name, words }) {
  const collections = getCollections();

  const collection = collections.find(
    (collection) => collection.id === collectionId
  );

  if (!collection) return null;

  const knownWords = Array.isArray(collection.knownWords)
    ? collection.knownWords
    : [];

  const unknownWords = Array.isArray(collection.unknownWords)
    ? collection.unknownWords
    : [];

  const updatedWordsById = new Map(
    words.map((word) => [word.id, word])
  );

  collection.name = name;
  collection.words = words;

  collection.knownWords = knownWords
    .filter((word) => updatedWordsById.has(word.id))
    .map((word) => updatedWordsById.get(word.id));

  collection.unknownWords = unknownWords
    .filter((word) => updatedWordsById.has(word.id))
    .map((word) => updatedWordsById.get(word.id));

  saveCollections(collections);

  return collection;
}