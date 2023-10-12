import auth from "@/firebase/auth";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const provider = new GoogleAuthProvider();

import {useAuthState} from "react-firebase-hooks/auth";

const useLogin = () => {

    const [user, loading, error] = useAuthState(auth);

    const onSignIn = async () => {
        await signInWithPopup(auth, provider)
            .catch((error) => {
                console.log(error)
            })
    }

    return {
        user,
        onSignIn,
        loading,
        error
    }
}

export default useLogin;