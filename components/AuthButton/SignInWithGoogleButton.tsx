import React from 'react';

import {Button} from "@chakra-ui/react";
import {FcGoogle} from "react-icons/fc";

import useSignIn from "@/hooks/auth/useSignIn";

const SignInWithGoogleButton = () => {

    const { onSignIn } = useSignIn();

    return (
        <Button
            leftIcon={<FcGoogle />}
            onClick={onSignIn}
        >
            Log In with Google
        </Button>
    );
};

export default SignInWithGoogleButton;