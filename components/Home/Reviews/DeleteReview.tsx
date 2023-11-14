import React from 'react';
import {IconButton} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import useDeleteReview from "@/hooks/mutators/useDeleteReview";

interface Props {
    reviewId: string,
}

const DeleteReview: React.FC<Props> = ({ reviewId }) => {

    const { onDelete } = useDeleteReview(reviewId);

    const deleteReview = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        await onDelete();
    }

    return (
        <IconButton
            aria-label={'Delete Review'}
            variant={'outline'}
            colorScheme={'red'}
            icon={<DeleteIcon />}
            onClick={deleteReview}
        />
    );
};

export default DeleteReview;
