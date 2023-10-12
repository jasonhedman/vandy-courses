import {useCollectionDataOnce} from "react-firebase-hooks/firestore";

import coursesCollection from "@/firebase/firestore/converters/courseConverter";

const useCourses = () => {

    const [courses, loading, error] = useCollectionDataOnce(coursesCollection);

    return {
        courses: courses || [],
        loading,
        error,
    }

}

export default useCourses;