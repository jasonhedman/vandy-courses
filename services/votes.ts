import {addDoc, collection, doc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {VoteInput, VoteStatus} from "@/types/Vote";

export const addVote = async (vote: VoteInput) => {
    const doc = await addDoc(collection(firestore, "votes"), vote)
    await updateDoc(doc, {
        id: doc.id,
    });
}

export const updateVote = async (voteId: string, voteStatus: VoteStatus) => {
    return updateDoc(doc(firestore, "votes", voteId), {
        voteStatus,
    });
}

