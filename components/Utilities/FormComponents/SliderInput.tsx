import React from 'react';

import {HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";

import FormElement from "@/components/Utilities/FormComponents/FormElement";

interface Props {
    label: string,
    value: number,
    onChange: (value: number) => void,
    min: number,
    max: number,
}

const SliderInput: React.FC<Props> = ({ label, value, onChange, min, max }) => {
    return (
        <FormElement label={label}>
            <HStack
                spacing={8}
            >
                <Slider
                    value={value}
                    onChange={onChange}
                    colorScheme='brand'
                    defaultValue={1}
                    min={min}
                    max={max}
                    step={1}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
                <Text
                    fontWeight={'semibold'}
                >
                    {value}/{max}
                </Text>
            </HStack>
        </FormElement>
    );
};

export default SliderInput;
