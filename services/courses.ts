import {doc, increment, setDoc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Course} from "@/types/Course";

export const setCourse = async (course: Course) => {
    return setDoc(doc(firestore, "courses", course.id), {course});
}

export const updateCourseNumReviews = async (courseId: string, isIncrement: boolean) => {
    return updateDoc(doc(firestore, "courses", courseId), {
        numReviews: increment(isIncrement ? 1 : -1)
    });
}