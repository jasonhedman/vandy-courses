import {useFormik} from "formik";

import useAuth from "@/hooks/auth/useAuth";

import {addReview} from "@/services/reviews";

import {ReviewInput} from "@/types/Review";

import * as Yup from 'yup';
import {ObjectSchema} from "yup";

import {AVERAGE_RATING, MAXIMUM_RATING, MINIMUM_RATING} from "@/data/reviewConstants";

const ReviewSchema: ObjectSchema<ReviewInput> = Yup.object().shape({
    courseId: Yup.string()
        .required('Course ID is Required'),
    professor: Yup.object().shape({
        id: Yup.string()
            .required('Professor is Required'),
        name: Yup.string()
            .required('Professor is Required')
    })
        .required('Professor is Required'),
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
        .min(MINIMUM_RATING, `Difficulty must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Difficulty must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
    skippability: Yup.number()
        .required('Skippability is Required')
        .min(MINIMUM_RATING, `Skippability must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Skippability must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
    takeHomeExams: Yup.boolean()
        .required('Take Home Exams is Required'),
    sleepScore: Yup.number()
        .required('Sleep Score is Required')
        .min(MINIMUM_RATING, `Sleep Score must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Sleep Score must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
    effortForA: Yup.number()
        .required('Effort for A is Required')
        .min(MINIMUM_RATING, `Effort for A must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Effort for A must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
    chatGptability: Yup.number()
        .required('Chat GPTability is Required')
        .min(MINIMUM_RATING, `Chat GPTability must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Chat GPTability must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
    profChillScore: Yup.number()
        .required('Prof Chill Score is Required')
        .min(MINIMUM_RATING, `Prof Chill Score must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`)
        .max(MAXIMUM_RATING, `Prof Chill Score must be between ${MINIMUM_RATING} and ${MAXIMUM_RATING}`),
});


const useCreateReview = () => {

    const { user } = useAuth()

    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleSubmit
    } = useFormik<ReviewInput>({
        initialValues: {
            courseId: "",
            professor: {
                id: "",
                name: "",
            },
            userId: user?.uid || "",
            title: "",
            content: "",
            rating: AVERAGE_RATING,
            difficulty: AVERAGE_RATING,
            skippability: AVERAGE_RATING,
            takeHomeExams: false,
            sleepScore: AVERAGE_RATING,
            effortForA: AVERAGE_RATING,
            chatGptability: AVERAGE_RATING,
            profChillScore: AVERAGE_RATING,
        },
        validationSchema: ReviewSchema,
        onSubmit: async values => {
            await addReview(values);
        },
    });

    return {
        values,
        errors,
        setFieldValue,
        setFieldTouched,
        touched,
        handleChange,
        handleSubmit,
        disabled: Object.keys(errors).length > 0 || Object.keys(touched).length === 0
    }
}

export default useCreateReview