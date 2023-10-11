import React from 'react';

import {Card, Flex} from "@chakra-ui/react";
import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";
import WriteReviewButton from "@/components/Home/ExploreHeader/WriteReviewButton";

const ExploreHeader = () => {
    return (
        <Card>
            <Flex
                justifyContent={'space-between'}
                alignItems={'flex-end'}
                gap={4}
            >
                <AutoCompleteMenu
                    label={"Course"}
                    placeholder={"Find a Course"}
                    options={[
                        "Computer Science",
                        "Mathematics",
                    ]}
                />
                <AutoCompleteMenu
                    label={"Professor"}
                    placeholder={"Find a Professor"}
                    options={[
                        "Alex Zhang",
                        "John Doe",
                    ]}
                />
                <WriteReviewButton />
            </Flex>
        </Card>
    );
};

export default ExploreHeader;
