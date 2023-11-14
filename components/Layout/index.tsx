import React from 'react';

import {Container, Flex, Skeleton} from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/auth/useAuth";
import NotConnected from "@/components/Layout/NotConnected";
import isAdmin from "@/data/admins";
import NotAdmin from "@/components/Layout/NotAdmin";

interface Props {
    children: React.ReactNode,
    authGate?: boolean,
    adminGate?: boolean,
}

const Layout: React.FC<Props> = ({ children, authGate, adminGate }) => {

    const { loading, user } = useAuth();

    return (
        <Container
            maxW={'6xl'}
            py={8}
        >
            <Flex
                direction={'column'}
                gap={4}
            >
                <Navbar/>
                {
                    authGate ? (
                        loading ? (
                            <Skeleton />
                        ) : (
                            user ? (
                                adminGate ? (
                                    isAdmin(user.uid) ? (
                                        children
                                    ) : (
                                        <NotAdmin />
                                    )
                                ) : (
                                    children
                                )
                            ) : (
                                <NotConnected />
                            )
                        )
                    ) : (
                        children
                    )
                }
            </Flex>
        </Container>
    );
};

export default Layout;
