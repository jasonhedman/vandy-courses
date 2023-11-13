import {useState} from "react";

import useReviews from "@/hooks/queries/useReviews";

import {Professor} from "@/types/Professor";

// custom hook to handle the reviews feed from the home page
// allows users to filter by course and professor
const useFeed = () => {
    const [courseId, setCourseId] = useState<string | null>(null);
    const [professor, setProfessor] = useState<Professor | null>(null);

    const { reviews, loading, error, sortBy, setSortBy } = useReviews(courseId, professor);

    return {
        courseId,
        setCourseId,
        professor,
        setProfessor,
        sortBy,
        setSortBy,
        reviews,
        loading,
        error
    }
}

export default useFeed;