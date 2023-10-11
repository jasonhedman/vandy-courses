import {doc, setDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Professor} from "@/types/Professor";

export const setProfessor = async (professor: Professor) => {
    return setDoc(doc(firestore, "professor", professor.id), professor);
}