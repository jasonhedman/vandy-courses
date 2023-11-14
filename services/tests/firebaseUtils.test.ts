import { jest, describe, it, expect } from "@jest/globals";

import { collection, deleteDoc, getDocs, query } from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import { deleteSubcollection } from "@/services/firebaseUtils";

// Mock Firestore functions
jest.mock("@firebase/firestore", () => ({
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

describe('Firebase Utility Services', () => {
  const parentCollection = 'parentCollection';
  const documentId = 'doc1';
  const subcollectionName = 'subcollection';

  it('returns true when successfully deleting all documents in a subcollection', async () => {
    const mockDocRef1 = { ref: { id: 'doc1' } };
    const mockDocRef2 = { ref: { id: 'doc2' } };
    const mockSubcollectionSnapshot = {
      docs: [mockDocRef1, mockDocRef2]
    };

    (getDocs as jest.MockedFunction<typeof getDocs>).mockResolvedValueOnce(mockSubcollectionSnapshot as any);
    (deleteDoc as jest.MockedFunction<typeof deleteDoc>).mockResolvedValueOnce(undefined);

    const result = await deleteSubcollection(parentCollection, documentId, subcollectionName);

    expect(result).toBe(true);
    expect(getDocs).toHaveBeenCalledWith(query(collection(firestore, parentCollection, documentId, subcollectionName)));
    expect(deleteDoc).toHaveBeenCalledTimes(2);
  });

  it('returns false when getDocs fails', async () => {
    (getDocs as jest.MockedFunction<typeof getDocs>).mockRejectedValueOnce(new Error('Failed to get documents'));

    const result = await deleteSubcollection(parentCollection, documentId, subcollectionName);

    expect(result).toBe(false);
    expect(getDocs).toHaveBeenCalledWith(query(collection(firestore, parentCollection, documentId, subcollectionName)));
  });

  it('returns false when deleting any document fails', async () => {
    const mockDocRef = { ref: { id: 'doc1' } };
    const mockSubcollectionSnapshot = {
      docs: [mockDocRef]
    };

    (getDocs as jest.MockedFunction<typeof getDocs>).mockResolvedValueOnce(mockSubcollectionSnapshot as any);
    (deleteDoc as jest.MockedFunction<typeof deleteDoc>).mockRejectedValueOnce(new Error('Failed to delete document'));

    const result = await deleteSubcollection(parentCollection, documentId, subcollectionName);

    expect(result).toBe(false);
    expect(getDocs).toHaveBeenCalledWith(query(collection(firestore, parentCollection, documentId, subcollectionName)));
    expect(deleteDoc).toHaveBeenCalledWith(mockDocRef.ref);
  });
});
