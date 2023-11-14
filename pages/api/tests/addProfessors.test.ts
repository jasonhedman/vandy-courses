import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import handler, { AddProfessorsResponse } from "@/pages/api/addProfessors";
import { fetchProfessors } from '@/services/coursesApi/fetch';
import { setProfessor } from "@/services/professors";

import type { NextApiRequest, NextApiResponse } from 'next'

jest.mock('@/services/coursesApi/fetch');
jest.mock('@/services/professors');

describe('/api/addProfessors', () => {
    const mockReq = {} as NextApiRequest;
    let mockRes: NextApiResponse<AddProfessorsResponse>;

    beforeEach(() => {
        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        } as unknown as NextApiResponse<AddProfessorsResponse>;
    });

    it('successfully adds professors', async () => {
        (fetchProfessors as jest.MockedFunction<typeof fetchProfessors>).mockResolvedValueOnce([
            {
                id: 'professor1',
                name: 'Test Professor',
            },
            {
                id: 'professor2',
                name: 'Test Professor 2',
            }
        ]);
        (setProfessor as jest.MockedFunction<typeof setProfessor>).mockResolvedValueOnce(true);

        await handler(mockReq, mockRes);

        expect(fetchProfessors).toHaveBeenCalled();
        expect(setProfessor).toHaveBeenCalledTimes(2);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Success' });
    });
});
