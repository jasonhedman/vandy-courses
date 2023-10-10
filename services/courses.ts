import {doc, setDoc} from "@firebase/firestore";

import db from "@/firebase/db";

import {Course} from "@/types/Course";

export const setCourse = async (course: Course) => {
    return setDoc(doc(db, "courses", course.id), course);
}