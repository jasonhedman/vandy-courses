import {useCollectionDataOnce} from "react-firebase-hooks/firestore";

import professorsCollection from "@/firebase/firestore/converters/professorConverter";

const useProfessors = () => {

    const [professors, loading, error] = useCollectionDataOnce(professorsCollection);

    return {
        professors,
        loading,
        error,
    }

}

export default useProfessors;