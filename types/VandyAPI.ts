export interface Term {
    $id: string;
    name: string;
    term_type: string;
    appx_start: string;
    appx_end: string;
}

export interface Course {
    $id: string;
    course_type: string;
    name: string;
    number: number;
    active: boolean;
    description: string;
    hours: number;
    format: string;
    school: string;
    attributes: string[];
    terms: Term[];
    parent_course: string;
}