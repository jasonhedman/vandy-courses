import {collection, deleteDoc, getDocs, query} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

export const deleteSubcollection = async (
    parentCollection: string,
    documentId: string,
    subcollectionName: string
): Promise<void> => {
    const subcollectionSnapshot = await getDocs(query(collection(firestore, parentCollection, documentId, subcollectionName)));
    await Promise.all(subcollectionSnapshot.docs.map(async (doc) => deleteDoc(doc.ref)));
};