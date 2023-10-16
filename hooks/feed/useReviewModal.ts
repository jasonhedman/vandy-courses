import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

import {Review} from "@/types/Review";

const useReviewModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [review, setReview] = useState<Review>();

    const openModal = (review: Review) => {
        setReview(review);
        onOpen();
    }

    return {
        isOpen,
        onClose,
        review,
        openModal
    }
}

export default useReviewModal