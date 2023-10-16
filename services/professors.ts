import {doc, setDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {PROFESSORS_COLLECTION} from "@/firebase/firestore/collections";

import {Professor} from "@/types/Professor";

export const setProfessor = async (professor: Professor) => {
    return setDoc(doc(firestore, PROFESSORS_COLLECTION, professor.id), professor);
}