import {useHits, useSearchBox} from "react-instantsearch";

// custom hook to get all professors
const useProfessors = () => {

    const { query, refine } = useSearchBox();
    const { hits } = useHits();

    return {
        hits,
        query,
        refine
    }
}

export default useProfessors;