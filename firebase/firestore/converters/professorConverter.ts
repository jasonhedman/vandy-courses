import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import {Professor} from "@/types/Professor";
import {PROFESSORS_COLLECTION} from "@/firebase/firestore/collections";

const professorConverter: FirestoreDataConverter<Professor> = {
    toFirestore(course: WithFieldValue<Professor>): DocumentData {
        return { id: course.id, name: course.name };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Professor {
        const data = snapshot.data(options);
        return {
            id: data.id,
            name: data.name,
        };
    },
};

const professorsCollection = collection(firestore, PROFESSORS_COLLECTION).withConverter(professorConverter);

export default professorsCollection;