import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import {Course} from "@/types/Course";
import firestore from "@/firebase/firestore";

const courseConverter: FirestoreDataConverter<Course> = {
    toFirestore(course: WithFieldValue<Course>): DocumentData {
        return { id: course.id, name: course.name, description: course.description, numReviews: course.numReviews };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Course {
        const data = snapshot.data(options);
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            numReviews: data.numReviews
        };
    },
};

const coursesCollection = collection(firestore, 'courses').withConverter(courseConverter);

export default coursesCollection;