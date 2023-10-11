import {Review} from "@/types/Review";

const dummyReviews: Review[] = [
    {
        id: "1",
        courseId: "CS 3250",
        professorId: "Dan Arena",
        userId: "aaa",
        rating: 5,
        difficulty: 3,
        title: "My favorite class with my favorite professor",
        content: "Algorithms is a very useful class for technical interviews. Dan Arena makes the class engaging and fun",
        score: 8
    },
    {
        id: "2",
        courseId: "CS 3250",
        professorId: "Julie Johnson",
        userId: "bbb",
        rating: 4,
        difficulty: 2,
        title: "Great class, but not my favorite professor",
        content: "Algorithms is a very useful class for technical interviews. Julie Johnson is a good professor, but I wish I had Dan Arena instead",
        score: 6
    }
];

export default dummyReviews;