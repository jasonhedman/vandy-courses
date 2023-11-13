const firestore = {};

const doc = jest.fn(() => firestore);
const collection = jest.fn(() => firestore);
const addDoc = jest.fn(() => Promise.resolve({ id: 'mockDocId' }));
const updateDoc = jest.fn(() => Promise.resolve());
export { addDoc, collection, doc, updateDoc };