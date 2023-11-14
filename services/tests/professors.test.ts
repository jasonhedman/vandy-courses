import { jest, describe, it, expect } from "@jest/globals";

import { doc, setDoc } from '@firebase/firestore';

import firestore from '@/firebase/firestore';

import { setProfessor } from '@/services/professors';
import { Professor } from "@/types/Professor";

// Mock Firebase Firestore functions
jest.mock("@firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

describe('Professor Services', () => {
  const mockProfessor: Professor = {
    id: 'professor1',
    name: 'Test Professor',
  };

  describe('setProfessor', () => {
    it('successfully sets a professor', async () => {
      (setDoc as jest.MockedFunction<typeof setDoc>).mockResolvedValueOnce(undefined);

      const result = await setProfessor(mockProfessor);

      expect(setDoc).toHaveBeenCalledWith(doc(firestore, 'professors', mockProfessor.id), mockProfessor);
      expect(result).toBe(true);
    });

    it('handles setDoc error', async () => {
      const mockError = new Error('Failed to set document');
      (setDoc as jest.MockedFunction<typeof setDoc>).mockRejectedValueOnce(mockError);

      const result = await setProfessor(mockProfessor);

      expect(result).toBe(false);
    });
  });
});
