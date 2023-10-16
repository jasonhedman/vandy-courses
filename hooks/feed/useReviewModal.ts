import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

const useReviewModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [reviewId, setReviewId] = useState<string>();

    const openModal = (reviewId: string) => {
        setReviewId(reviewId);
        onOpen();
    }

    return {
        isOpen,
        onClose,
        reviewId,
        openModal
    }
}

export default useReviewModal