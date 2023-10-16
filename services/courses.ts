import {doc, increment, setDoc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Course} from "@/types/Course";
import {COURSES_COLLECTION} from "@/firebase/firestore/collections";

export const setCourse = async (course: Course) => {
    return setDoc(doc(firestore, COURSES_COLLECTION, course.id), {...course});
}

export const updateCourseNumReviews = async (courseId: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, COURSES_COLLECTION, courseId), {
        numReviews: increment(amountIncrement)
    });
}