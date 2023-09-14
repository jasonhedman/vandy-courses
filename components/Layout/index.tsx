import React from 'react';

import {Box, Container} from "@chakra-ui/react";

import Navbar from "@/components/Navbar";
import useAuth from "@/hooks/useAuth";
import LoadingIndicator from "@/components/Utilities/LoadingIndicator";
import NotConnected from "@/components/Layout/NotConnected";

interface Props {
    children: React.ReactNode,
    authGate?: boolean
}

const Layout: React.FC<Props> = ({ children, authGate }) => {

    const { isConnected, loading } = useAuth();

    return (
        <Box
            w={'100%'}
            p={8}
        >
            <Navbar />
            <Container
                maxW={'6xl'}
                py={8}
            >
                {
                    authGate ? (
                        loading ? (
                            <LoadingIndicator />
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
            </Container>
        </Box>
    );
};

export default Layout;
