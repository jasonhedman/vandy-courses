import {useCollectionDataOnce} from "react-firebase-hooks/firestore";

import coursesCollection from "@/firebase/firestore/converters/courseConverter";
import {orderBy, query} from "@firebase/firestore";

// custom hook to get all courses
const useCourses = () => {

    // get all courses, ordered by number of reviews
    const [courses, loading, error] = useCollectionDataOnce(query(
        coursesCollection,
        orderBy('numReviews', 'desc')
    ));

    return {
        courses: courses || [],
        loading,
        error,
    }

}

export default useCourses;