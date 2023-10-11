import {doc, setDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Course} from "@/types/Course";

export const setCourse = async (course: Course) => {
    return setDoc(doc(firestore, "courses", course.id), course);
}