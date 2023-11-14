import auth from "@/firebase/auth";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const provider = new GoogleAuthProvider();

// restrict sign in to vanderbilt.edu emails
provider.setCustomParameters({hd: "vanderbilt.edu"})

import {useAuthState} from "react-firebase-hooks/auth";

// custom hook to handle logging users in via Google OAuth
const useSignIn = () => {

    const [user, loading, error] = useAuthState(auth);

    // signs a user in via Google OAuth popup
    const onSignIn = async () => {
        await signInWithPopup(auth, provider)
    }

    return {
        user,
        onSignIn,
        loading,
        error
    }
}

export default useSignIn;