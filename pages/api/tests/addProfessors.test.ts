import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import handler, { AddProfessorsResponse } from "@/pages/api/addProfessors";
import {fetchAllProfessors} from '@/services/coursesApi/fetch';
import { setProfessor } from "@/services/professors";

import type { NextApiRequest, NextApiResponse } from 'next'

jest.mock('@/services/coursesApi/fetch');
jest.mock('@/services/professors');

describe('/api/addProfessors', () => {
    let mockReq: NextApiRequest;
    let mockRes: NextApiResponse<AddProfessorsResponse>;

    beforeEach(() => {
        mockReq = {
            query: { page: '1' } // Ensure this matches the expected format in your handler
        } as unknown as NextApiRequest;

        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        } as unknown as NextApiResponse<AddProfessorsResponse>;
    });

    it('successfully adds professors', async () => {
        (fetchAllProfessors as jest.MockedFunction<typeof fetchAllProfessors>).mockResolvedValueOnce([
            { id: "prof1", name: "Professor 1" },
            { id: "prof2", name: "Professor 2" }
        ]);
        (setProfessor as jest.MockedFunction<typeof setProfessor>).mockResolvedValueOnce(true);

        await handler(mockReq, mockRes);

        expect(fetchAllProfessors).toHaveBeenCalled();
        expect(setProfessor).toHaveBeenCalledTimes(2);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Success' });
    });
});
