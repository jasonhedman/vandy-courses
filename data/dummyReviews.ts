import {Review} from "@/types/Review";
import moment from "moment";

const dummyReviews: Review[] = [
    {
        id: "1",
        courseId: "CS 3250",
        professor: {
            id: "Dan Arena",
            name: "Dan Arena"
        },
        userId: "aaa",
        rating: 5,
        difficulty: 3,
        skippability: 4,
        takeHomeExams: true,
        sleepScore: 5,
        effortForA: 3,
        chatGptability: 4,
        profChillScore: 5,
        title: "My favorite class with my favorite professor",
        content: "Algorithms is a very useful class for technical interviews. Dan Arena makes the class engaging and fun",
        score: 8,
        createdAt: moment()
    },
    {
        id: "2",
        courseId: "CS 3250",
        professor: {
            id: "Julie Johnson",
            name: "Julie Johnson"
        },
        userId: "bbb",
        rating: 4,
        difficulty: 2,
        skippability: 3,
        takeHomeExams: false,
        sleepScore: 4,
        effortForA: 2,
        chatGptability: 3,
        profChillScore: 4,
        title: "Great class, but not my favorite professor",
        content: "Algorithms is a very useful class for technical interviews. Julie Johnson is a good professor, but I wish I had Dan Arena instead",
        score: 6,
        createdAt: moment()
    }
];

export default dummyReviews;