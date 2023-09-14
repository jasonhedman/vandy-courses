import React from 'react'

import {Box, Icon, Text, VStack} from '@chakra-ui/react'

import Card from "@/components/Utilities/Card"

import {Step} from "@/types/Step";

interface Props {
    offering: Step
}

const Step: React.FC<Props> = ({ offering }) => {

    return (
        <Card
            alignItems='center'
            gap={4}
        >
            <Box
                borderRadius='full'
                boxSize={20}
                display='flex'
                alignItems='center'
                justifyContent='center'
                shadow='lg'
                borderWidth={2}
                borderColor='brand.500'
            >
                <Icon
                    as={offering.icon}
                    boxSize={12}
                    color='brand.500'
                />
            </Box>
            <VStack>
                <Text
                    fontSize='xl'
                    fontWeight='bold'
                    textAlign='center'
                >
                    {offering.title}
                </Text>
                <Text
                    textAlign='center'
                >
                    {offering.description}
                </Text>
            </VStack>
        </Card>
    )
}

export default Step