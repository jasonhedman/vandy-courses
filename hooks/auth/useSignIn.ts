import auth from "@/firebase/auth";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const provider = new GoogleAuthProvider();

provider.setCustomParameters({hd: "vanderbilt.edu"})

import {useAuthState} from "react-firebase-hooks/auth";

const useLogin = () => {

    const [user, loading, error] = useAuthState(auth);

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

export default useLogin;