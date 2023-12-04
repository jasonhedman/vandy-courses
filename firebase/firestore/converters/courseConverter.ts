import {
    collection, doc,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {COURSES_COLLECTION} from "@/firebase/firestore/collections";

import {Course} from "@/types/Course";


// converts a course document to a Course object, allowing for typed queries and strict type checking
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

// collection reference for querying courses
const coursesCollection = collection(firestore, COURSES_COLLECTION).withConverter(courseConverter);

export const courseDocument = (id: string) => doc(coursesCollection, id).withConverter(courseConverter);

export default coursesCollection;