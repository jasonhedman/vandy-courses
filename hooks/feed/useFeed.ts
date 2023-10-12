import {useState} from "react";

import useReviews from "@/hooks/queries/useReviews";

import {Professor} from "@/types/Professor";
import {Course} from "@/types/Course";

const useFeed = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [professor, setProfessor] = useState<Professor | null>(null);

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