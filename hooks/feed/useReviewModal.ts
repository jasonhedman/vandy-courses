import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

// custom hook to handle the review modal, which opens when a user clicks on a review from the feed
const useReviewModal = () => {

    // handles the open/close state of the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    // holds the review that the user clicked on
    const [reviewId, setReviewId] = useState<string>();

    // opens the modal and sets the review
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