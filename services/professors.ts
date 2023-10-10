import {doc, setDoc} from "@firebase/firestore";

import db from "@/firebase/db";

import {Professor} from "@/types/Professor";

export const setProfessor = async (professor: Professor) => {
    return setDoc(doc(db, "professor", professor.id), professor);
}