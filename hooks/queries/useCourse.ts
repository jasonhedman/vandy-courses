import {useDocumentData} from "react-firebase-hooks/firestore";

import {courseDocument} from "@/firebase/firestore/converters/courseConverter";

const useCourse = (id: string) => {
    const [course, loading, error] = useDocumentData(courseDocument(id));

    return {
        course,
        loading,
        error,
    };
}

export default useCourse;