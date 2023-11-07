import { IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { WarningIcon } from "@chakra-ui/icons";
import WriteReportModal from "@/components/Home/WriteReportModal";


// Positioned absolutely on the review modal
const ReportButton = ( {reviewId} ) => {
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
      />
      <WriteReportModal reviewId={reviewId} isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ReportButton;
