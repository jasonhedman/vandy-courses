import React from 'react';

import {

    Drawer,
    IconButton,
    DrawerContent,
    useDisclosure,
    DrawerOverlay,
    Heading,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import NavLinks from './NavLinks';

interface Props {
    userId?: string,
}

const MobileNav: React.FC<Props> = ({ userId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<HamburgerIcon />}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                size={'full'}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Heading
                            size={'md'}
                        >
                            Vandy Courses
                        </Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        <NavLinks
                            userId={userId}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MobileNav;