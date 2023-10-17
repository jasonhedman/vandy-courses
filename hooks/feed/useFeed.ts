import {useState} from "react";

import useReviews from "@/hooks/queries/useReviews";

import {Professor} from "@/types/Professor";
import {Course} from "@/types/Course";

// custom hook to handle the reviews feed from the home page
// allows users to filter by course and professor
const useFeed = () => {

    // holds the course that the user is filtering by
    const [course, setCourse] = useState<Course | null>(null);

    // holds the professor that the user is filtering by
    const [professor, setProfessor] = useState<Professor | null>(null);

    // loads the reviews, passing the course and professor as parameters
    const { reviews, loading, error } = useReviews(course, professor);

    return {
        course,
        setCourse,
        professor,
        setProfessor,
        reviews,
        loading,
        error
    }
}

export default useFeed;