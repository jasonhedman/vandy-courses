import {useState} from "react";

import useReviews from "@/hooks/queries/useReviews";

import {Professor} from "@/types/Professor";

const useFeed = () => {
    const [courseId, setCourseId] = useState<string | null>(null);
    const [professor, setProfessor] = useState<Professor | null>(null);

    const { reviews, loading, error } = useReviews(courseId, professor);

    return {
        courseId,
        setCourseId,
        professor,
        setProfessor,
        reviews,
        loading,
        error
    }
}

export default useFeed;