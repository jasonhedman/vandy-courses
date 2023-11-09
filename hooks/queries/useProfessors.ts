import {useCollectionDataOnce} from "react-firebase-hooks/firestore";

import professorsCollection from "@/firebase/firestore/converters/professorConverter";

// custom hook to get all professors
const useProfessors = () => {

    const [professors, loading, error] = useCollectionDataOnce(professorsCollection);

    return {
        professors: professors || [],
        loading,
        error,
    }

}

export default useProfessors;