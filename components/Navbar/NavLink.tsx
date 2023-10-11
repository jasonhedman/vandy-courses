import React from 'react'

import Link from 'next/link'

import { Button } from '@chakra-ui/react'

import { Route } from '@/types/Route'
import {useRouter} from "next/router";

const NavLink : React.FC<Route> = ({ href, text}) => {

    const { pathname } = useRouter();

    const isActive = pathname === href;

      return (
        <Link
            href={href}
            passHref
        >
            <Button
                variant='ghost'
                colorScheme={isActive ? 'brand' : 'gray'}
            >
                {text}
            </Button>
        </Link>
      )
}

export default NavLink