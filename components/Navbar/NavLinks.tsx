import React from 'react';

import {Stack} from "@chakra-ui/react";

import NavLink from "@/components/Navbar/NavLink";
import routes from "@/components/Navbar/routes";

interface Props {
    userId?: string,
}


const NavLinks: React.FC<Props> = ({ userId }) => {
    return (
        <Stack
            direction={{
                base: 'column',
                md: 'row'
            }}
        >
            {
                routes(userId).map((route) => (
                    <NavLink
                        key={route.href}
                        href={route.href}
                        text={route.text}
                    />
                ))
            }
        </Stack>
    );
};

export default NavLinks;
