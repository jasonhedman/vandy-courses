import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

import {Course} from "@/types/Course";

const useCourseModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [course, setCourse] = useState<Course>();

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