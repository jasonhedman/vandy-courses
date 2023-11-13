jest.mock("@firebase/firestore", () => ({
    collection: jest.fn(),
    deleteDoc: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
  }));
  
  import { deleteSubcollection } from "../firebaseUtils"; // Replace with the correct path
  import { collection, deleteDoc, getDocs, query } from "@firebase/firestore";
  
  describe("deleteSubcollection", () => {
    const mockParentCollection = "parentCollection";
    const mockDocumentId = "documentId";
    const mockSubcollectionName = "subcollectionName";
    const mockDocs = [{ id: "doc1", ref: "docRef1" }, { id: "doc2", ref: "docRef2" }];
  
    beforeEach(() => {
      jest.clearAllMocks();
  
      (getDocs as jest.Mock).mockResolvedValue({
        docs: mockDocs.map((doc) => ({
          ref: { path: doc.ref }, 
          data: () => doc,
        })),
      });
    });
  
    it("should delete all documents in a subcollection", async () => {
      await deleteSubcollection(mockParentCollection, mockDocumentId, mockSubcollectionName);
  
      expect(query).toHaveBeenCalledWith(expect.anything());
      expect(getDocs).toHaveBeenCalledTimes(1);
  
      mockDocs.forEach((doc) => {
        expect(deleteDoc).toHaveBeenCalledWith({ path: doc.ref });
      });
    });
  
    it("should handle the case where the subcollection is empty", async () => {
      (getDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });
  
      await deleteSubcollection(mockParentCollection, mockDocumentId, mockSubcollectionName);
      expect(deleteDoc).not.toHaveBeenCalled();
    });
});