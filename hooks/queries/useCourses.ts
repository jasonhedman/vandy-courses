import {useHits, useSearchBox} from "react-instantsearch";

// custom hook to get all courses
const useCourses = () => {
    const { query, refine } = useSearchBox();
    const { hits } = useHits();

    return {
        hits,
        query,
        refine
    }
}

export default useCourses;