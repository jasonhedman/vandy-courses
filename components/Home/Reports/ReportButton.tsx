import React from 'react';

import {
    IconButton,
    useDisclosure
} from '@chakra-ui/react';
import { WarningIcon } from "@chakra-ui/icons";

import WriteReportModal from "@/components/Home/Reports/WriteReportModal";

interface Props {
    reviewId: string
}


// Positioned absolutely on the review modal
const ReportButton: React.FC<Props> = ({ reviewId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <IconButton
            size='md'
            width='32px'
            height='32px'
            variant='ghost'
            position='absolute'
            top='var(--chakra-space-2)'
            right='var(--chakra-space-12)'
            icon={<WarningIcon />}
            onClick={onOpen}
            aria-label={'Report'}
        />
        <WriteReportModal
            reviewId={reviewId}
            isOpen={isOpen}
            onClose={onClose}
        />
    </>
  );
};

export default ReportButton;
