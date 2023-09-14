import React from 'react'

import { Flex } from '@chakra-ui/react'

import Step from './Step'

import homePageSteps from '@/data/homePageSteps'

const Steps = () => {
    return (
        <Flex
            gap={4}
            flexDirection={{ base: 'column', md: 'row' }}
            w='100%'
        >
            {
                homePageSteps.map((step) => (
                    <Step
                        key={step.title}
                        offering={step}
                    />
                ))
            }
        </Flex>
    )
}

export default Steps