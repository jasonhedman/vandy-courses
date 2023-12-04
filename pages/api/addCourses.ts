import {fetchCourses} from '@/services/coursesApi/fetch';

import {setCourse} from "@/services/courses";
import {courseAdapter} from "@/services/coursesApi/adapters";

import type { NextApiRequest, NextApiResponse } from 'next'

export type AddCoursesResponse = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AddCoursesResponse>
) {
    const { page } = req.query;
    const courses = await fetchCourses('1000', parseInt(page as string));
    await Promise.all(courses.map(course => setCourse(courseAdapter(course))));
    res.status(200).json({ message: 'Success' })
}