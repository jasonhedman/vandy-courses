import React from 'react';
import {VStack} from "@chakra-ui/react";
import AdminHeader from "@/components/Admin/AdminHeader";
import ReportedReviews from "@/components/Admin/ReportedReviews";

const Admin = () => {
    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <AdminHeader />
            <ReportedReviews />
        </VStack>
    );
};

export default Admin;
