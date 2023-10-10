import {Course, Term} from "@/types/VandyAPI";
import {Professor} from "@/types/Professor";

const baseEndpoint = "https://courses.clubfair.io/v1"

const header = "Bearer " + process.env.API_BEARER_TOKEN;

enum Endpoint {
    TERMS = "/terms",
    TERM_COURSES = "/term/courses",
}

const endpoint = (path: Endpoint) => baseEndpoint + path;

const fetchData = (path: Endpoint, body?: object) => fetch(endpoint(path), {
    method: "POST",
    headers: {
        authorization: header,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
})
    .then(response => response.json())
    .then(data => {
        return data.error ? Promise.reject(data.error) : data.data
    })

export const fetchTerms = async (): Promise<Term[]> => fetchData(Endpoint.TERMS)
    .then(terms => terms as Term[])
    .catch(() => []);

export const fetchCourses = async (termId: string): Promise<Course[]> => fetchData(Endpoint.TERM_COURSES, {
    term_id: termId,
})
    .then(courses => courses as Course[])
    .catch(() => []);

export const fetchProfessors = async (): Promise<Professor[]> => {
    // TODO: Implement this once Dylan writes Professor endpoint
    return [
        {
            name: 'John Doe',
            id: '1'
        },
        {
            name: 'Jane Doe',
            id: '2'
        }
    ]
}