import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

// custom hook to handle the course modal, which opens when a user clicks on a course from the courses page
const useCourseModal = () => {

    // handles the open/close state of the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // holds the course that the user clicked on
    const [courseId, setCourseId] = useState<string>();

    // opens the modal and sets the course
    const openCourseModal = (courseId: string) => {
        setCourseId(courseId);
        onOpen();
    }

    return {
        isOpen,
        onClose,
        courseId,
        openCourseModal
    }
}

export default useCourseModal;