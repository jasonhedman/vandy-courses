import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Avatar
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import SignInWithGoogleButton from "@/components/AuthButton/SignInWithGoogleButton";

import useAuth from "@/hooks/auth/useAuth";

const AuthButton = () => {

    const { user, onSignOut } = useAuth()

    if(!user) {
        return (
            <SignInWithGoogleButton />
        )
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                leftIcon={
                    <Avatar
                        size={'sm'}
                        name={user.displayName || undefined}
                        src={user.photoURL || undefined}
                        referrerPolicy="no-referrer"
                    />
                }
            >
                {user?.displayName}
            </MenuButton>
            <MenuList>
                <MenuItem
                    onClick={() => onSignOut()}
                >
                    Sign Out
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default AuthButton