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

const professorsCollection = collection(firestore, 'professors').withConverter(professorConverter);

export default professorsCollection;