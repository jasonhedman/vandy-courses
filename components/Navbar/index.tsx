import React from 'react'

import {Card, Flex, HStack, Image} from '@chakra-ui/react'

import AuthButton from '../AuthButton/AuthButton'
import NavLink from './NavLink'

import routes from './routes'
import ColorModeToggle from "@/components/Navbar/ColorModeToggle";

const Navbar = () => {
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
            <HStack
                mr='auto'
            >
                {
                    routes.map((route) => (
                        <NavLink
                            key={route.href}
                            href={route.href}
                            text={route.text}
                        />
                    ))
                }
            </HStack>
            <HStack>
                <ColorModeToggle />
                <AuthButton />
            </HStack>
        </Flex>
      </Card>
  )
}

export default Navbar