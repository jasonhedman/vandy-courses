import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import SignInWithGoogleButton from "@/components/AuthButton/SignInWithGoogleButton";

import useAuth from "@/hooks/auth/useAuth";

const AuthButton = () => {

    const { user, isConnected, onSignOut } = useAuth()

    if(!isConnected) {
        return (
            <SignInWithGoogleButton />
        )
    }

    if(isConnected) {
        return (
            <Menu
                colorScheme="whiteAlpha"
            >
                <MenuButton 
                    as={Button} 
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="whiteAlpha"
                >
                    {user?.displayName}
                </MenuButton>
                <MenuList
                    
                >
                    <MenuItem
                        onClick={() => onSignOut()}
                    >
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }
}

export default AuthButton