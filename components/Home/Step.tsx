import React from 'react'

import {Box, Icon, Text, VStack, Card} from '@chakra-ui/react'

import {Step} from "@/types/Step";

interface Props {
    offering: Step
}

const Step: React.FC<Props> = ({ offering }) => {

    return (
        <Card>
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