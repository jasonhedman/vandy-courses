import React from 'react';
import {Card, Heading, Skeleton, Text, VStack} from "@chakra-ui/react";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import useAuth from "@/hooks/auth/useAuth";
import UserReviews from "@/components/Profile/UserReviews";

const Profile = () => {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Skeleton />
        )
    }

    if(!user) {
        return (
            <Card>
                <Heading>
                    No User
                </Heading>
                <Text>
                    Please log in to view your profile.
                </Text>
            </Card>
        )
    }

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <ProfileHeader
                user={user}
            />
            <UserReviews
                userId={user.uid}
            />
        </VStack>
    );
};

export default Profile;
