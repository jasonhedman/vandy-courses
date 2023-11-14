import React from 'react';

import {Skeleton, Text, VStack} from "@chakra-ui/react";

import Report from "@/components/Home/Reports/Report";

import useReports from "@/hooks/queries/useReports";

interface Props {
    reviewId: string,
}

const Reports: React.FC<Props> = ({ reviewId }) => {

    const { reports, loading } = useReports(reviewId);

    return (
        <VStack
            w={'100%'}
        >
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                    />
                ) : (
                    reports.length > 0 ? (
                        reports.map((report) => (
                            <Report
                                key={report.id}
                                report={report}
                            />
                        ))
                    ) : (
                        <Text>
                            No Reports!
                        </Text>
                    )
                )
            }
        </VStack>
    );
};

export default Reports;
