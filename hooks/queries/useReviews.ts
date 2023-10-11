import {useState} from "react";

import {query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import coursesCollection from "@/firebase/firestore/converters/courseConverter";

import {Course} from "@/types/Course";
import {Professor} from "@/types/Professor";

const useReviews = () => {

    const [professor, setProfessor] = useState<Professor | null>(null);
    const [course, setCourse] = useState<Course | null>(null);

    // TODO: add configurable querying
    const [reviews, loading, error] = useCollectionData(query(coursesCollection));

    return {
        reviews,
        loading,
        error,
        professor,
        setProfessor,
        course,
        setCourse
    }

}

export default useReviews;