import React from 'react'

import {Box, Card, Flex, HStack, Image} from '@chakra-ui/react'

import AuthButton from '@/components/AuthButton/AuthButton'
import ColorModeToggle from "@/components/Navbar/ColorModeToggle";
import NavLinks from "@/components/Navbar/NavLinks";
import MobileNav from "@/components/Navbar/MobileNavbar";

import useAuth from "@/hooks/auth/useAuth";

const Navbar = () => {

    const { user } = useAuth();

    return (
          <Card
            p={2}
          >
                <Flex
                    alignItems="center"
                    w='100%'
                    gap={4}
                    h='60px'
                    bg='navbar.500'
                    rounded='md'
                    px={4}
                >
                    <Image
                        src="/logo.png"
                        height='40px'
                        alt='Vanderbilt Logo'
                    />
                    <Box
                        display={{
                            base: 'none',
                            md: 'flex'
                        }}
                    >
                        <NavLinks
                            userId={user?.uid}
                        />
                    </Box>
                    <HStack
                        ml='auto'
                    >
                        <ColorModeToggle />
                        <AuthButton />
                        <MobileNav
                            userId={user?.uid}
                        />
                    </HStack>
                </Flex>
          </Card>
    )
}

export default Navbar