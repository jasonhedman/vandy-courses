import {useCollectionDataOnce} from "react-firebase-hooks/firestore";

import coursesCollection from "@/firebase/firestore/converters/courseConverter";
import {orderBy, query} from "@firebase/firestore";

const useCourses = () => {

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