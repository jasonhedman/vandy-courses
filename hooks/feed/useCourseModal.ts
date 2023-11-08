import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

import {Course} from "@/types/Course";

// custom hook to handle the course modal, which opens when a user clicks on a course from the courses page
const useCourseModal = () => {

    // handles the open/close state of the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // holds the course that the user clicked on
    const [course, setCourse] = useState<Course>();

    // opens the modal and sets the course
    const openCourseModal = (course: Course) => {
        setCourse(course);
        onOpen();
    }

    return {
        isOpen,
        onClose,
        course,
        openCourseModal
    }
}

export default useCourseModal;