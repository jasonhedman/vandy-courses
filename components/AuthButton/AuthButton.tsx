import React from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, Avatar, IconButton, useBreakpointValue
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import SignInWithGoogleButton from "@/components/AuthButton/SignInWithGoogleButton";

import useAuth from "@/hooks/auth/useAuth";

const AuthButton = () => {

    const { user, onSignOut } = useAuth()

    const menuButton = useBreakpointValue({
        base: (
            <MenuButton
                display={{base: 'flex', md: 'none'}}
                as={IconButton}
                aria-label={'Profile '}
                icon={
                    <Avatar
                        size={'sm'}
                        name={user?.displayName || ""}
                        src={user?.photoURL || ""}
                    />
                }
            />
        ),
        md: (
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                leftIcon={
                    <Avatar
                        size={'sm'}
                        name={user?.displayName || undefined}
                        src={user?.photoURL || undefined}
                        referrerPolicy="no-referrer"
                    />
                }
            >
                {user?.displayName}
            </MenuButton>
        )
    })

    if(!user) {
        return (
            <SignInWithGoogleButton />
        )
    }

    return (
        <Menu>
            {menuButton}
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