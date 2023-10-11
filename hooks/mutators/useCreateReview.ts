import {useFormik} from "formik";

import useAuth from "@/hooks/useAuth";

import {addReview} from "@/services/reviews";

import {ReviewInput} from "@/types/Review";

import * as Yup from 'yup';
import {ObjectSchema} from "yup";
import {MAXIMUM_RATING, MINIMUM_DIFFICULTY, MINIMUM_RATING} from "@/data/reviewConstants";

const ReviewSchema: ObjectSchema<ReviewInput> = Yup.object().shape({
    courseId: Yup.string()
        .required('Course ID is Required'),
    professorId: Yup.string()
        .required('Professor ID is Required'),
    userId: Yup.string()
        .required('User ID is Required'),
    title: Yup.string()
        .required('Title is Required'),
    content: Yup.string()
        .required('Content is Required'),
    rating: Yup.number()
        .required('Rating is Required')
        .min(MINIMUM_RATING, `Rating must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Rating must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
    difficulty: Yup.number()
        .required('Difficulty is Required')
        .min(MINIMUM_DIFFICULTY, `Difficulty must be between ${MINIMUM_DIFFICULTY} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Difficulty must be between ${MINIMUM_DIFFICULTY} and ${MAXIMUM_RATING}`),
});


const useCreateReview = () => {

    const { user } = useAuth()

    const { values, errors, touched, handleChange, handleSubmit } = useFormik<ReviewInput>({
        initialValues: {
            courseId: "",
            professorId: "",
            userId: user?.uid || "",
            title: "",
            content: "",
            rating: MINIMUM_RATING,
            difficulty: MINIMUM_DIFFICULTY,
        },
        validationSchema: ReviewSchema,
        onSubmit: async values => {
            await addReview(values);
        },
    });

    return {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    }
}

export default useCreateReview