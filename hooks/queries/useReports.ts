import {query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {reportsCollection} from "@/firebase/firestore/converters/reportConverter";

// custom hook to get all reports for a review
const useReports = (reviewId: string) => {

    // get all comments for a review, ordered by score
    const [reports, loading, error] = useCollectionData(query(reportsCollection(reviewId)));

    console.log(reports);

    return {
        // filter out any comments with undefined IDs (which must be added to the record after creation)
        reports: reports ? reports.filter(reports => reports.id !== undefined) : [],
        loading,
        error,
    }
}

export default useReports;