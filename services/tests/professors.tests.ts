jest.mock("@firebase/firestore", () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
  }));
  
  jest.mock("@/firebase/firestore", () => ({}));
  
  import { setProfessor } from "../professors"; 
  import { doc, setDoc } from "@firebase/firestore";
  
  const PROFESSORS_COLLECTION = "professors"; 
  describe('setProfessor', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should add a professor document and return true on success', async () => {
      const mockProfessor = { id: "prof1", name: "Professor X", department: "Psychology" };
      (setDoc as jest.Mock).mockResolvedValueOnce(undefined); 
  
      const result = await setProfessor(mockProfessor);
  
      expect(result).toBeTruthy();
      expect(doc).toHaveBeenCalledWith(expect.anything(), PROFESSORS_COLLECTION, mockProfessor.id);
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), mockProfessor);
    });
  
    it('should return false when adding a professor document fails', async () => {
      const mockProfessor = { id: "prof1", name: "Professor X", department: "Psychology" };
      (setDoc as jest.Mock).mockRejectedValueOnce(new Error("Failed to add doc")); 
  
      const result = await setProfessor(mockProfessor);
  
      expect(result).toBeFalsy();
    });
  });
  