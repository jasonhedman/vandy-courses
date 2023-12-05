import { jest, describe, it, expect, beforeEach } from "@jest/globals";

import handler, {AddCoursesResponse} from "@/pages/api/addCourses";

import { fetchCourses } from '@/services/coursesApi/fetch';
import { setCourse } from "@/services/courses";
import { courseAdapter } from "@/services/coursesApi/adapters";

import type { NextApiRequest, NextApiResponse } from 'next'

jest.mock('@/services/coursesApi/fetch');
jest.mock('@/services/courses');
jest.mock('@/services/coursesApi/adapters');

describe('/api/addCourses', () => {
    let mockReq: NextApiRequest;
    let mockRes: NextApiResponse<AddCoursesResponse>;

    beforeEach(() => {
        mockReq = {
            query: { page: '1' } // Include a page key with a value
        } as unknown as NextApiRequest;

        mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        } as unknown as NextApiResponse<AddCoursesResponse>;
    });

    it('successfully adds courses', async () => {
        (fetchCourses as jest.MockedFunction<typeof fetchCourses>).mockResolvedValueOnce([
            {
                $id: 'course1',
                course_type: 'course',
                name: 'Test Course',
                number: 1000,
                active: true,
                description: 'Test Course Description',
                hours: 3,
                format: 'Test Course Format',
                school: 'Test School',
                attributes: ['Test Attribute'],
                terms: [],
                parent_course: 'Test Parent Course'
            },
            {
                $id: 'course2',
                course_type: 'course',
                name: 'Test Course 2',
                number: 2000,
                active: true,
                description: 'Test Course Description 2',
                hours: 3,
                format: 'Test Course Format 2',
                school: 'Test School 2',
                attributes: ['Test Attribute 2'],
                terms: [],
                parent_course: 'Test Parent Course 2'
            }
        ]);
        (setCourse as jest.MockedFunction<typeof setCourse>).mockResolvedValueOnce(true);

        await handler(mockReq, mockRes);

        expect(fetchCourses).toHaveBeenCalledWith('1000', 1);
        expect(courseAdapter).toHaveBeenCalledTimes(2);
        expect(setCourse).toHaveBeenCalledTimes(2);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Success' });
    });
});
