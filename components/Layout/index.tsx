import React from 'react';

import {Container, Flex, Skeleton} from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/auth/useAuth";
import NotConnected from "@/components/Layout/NotConnected";

interface Props {
    children: React.ReactNode,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {

    const { isConnected, loading } = useAuth();

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
                            isConnected ? (
                                children
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
