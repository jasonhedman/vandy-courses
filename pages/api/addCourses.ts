import {fetchCourses} from '@/services/coursesApi/fetch';

import type { NextApiRequest, NextApiResponse } from 'next'
import {setCourse} from "@/services/courses";
import {courseAdapter} from "@/services/coursesApi/adapters";

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const courses = await fetchCourses('1000');
    await Promise.all(courses.map(course => setCourse(courseAdapter(course))));
    res.status(200).json({ message: 'Success' })
}