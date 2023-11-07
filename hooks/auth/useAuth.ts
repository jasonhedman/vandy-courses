import { useState, useEffect } from "react";

import auth from "@/firebase/auth";

import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {User} from "@firebase/auth";

// custom hook to handle authentication state
const useAuth = () => {

    // get auth state from firebase
    // rawUser is populated after successful login through useSignIn.ts hook
    const [rawUser, loading, error] = useAuthState(auth);

    // hold user state in separate hook to bypass Next.js server-side rendering hydration error
    const [user, setUser] = useState<User | null| undefined>(rawUser);

    useEffect(() => {
        setUser(rawUser);
    }, [rawUser]);

    // sign out function to allow for sign out from any component
    const [signOut] = useSignOut(auth);

    const onSignOut = async (): Promise<boolean> => (
        signOut()
            .then((_result) => true)
            .catch((_error) => false)
    )

    return {
        user,
        isConnected: !!user,
        onSignOut,
        loading,
        error,
    }
}

export default useAuth;