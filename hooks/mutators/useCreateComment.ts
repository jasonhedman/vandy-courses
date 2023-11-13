import { useEffect } from "react";

import useAuth from "@/hooks/auth/useAuth";

import {addComment} from "@/services/comment";

import {CommentInput} from "@/types/Comment";

import {useFormik} from "formik";

import * as Yup from 'yup';
import {ObjectSchema} from "yup";

import filter from "leo-profanity";
import {useToast} from "@chakra-ui/react";

// schema for validating comment input
const CommentSchema: ObjectSchema<CommentInput> = Yup.object().shape({
    reviewId: Yup.string()
        .required('Review ID is Required')
        .min(1, 'Review ID is Required')
        .test('profanity check', 'Profanity is not allowed', (val) => !filter.check(val)),
    content: Yup.string()
        .required('Content is Required')
        .min(1, 'Content is Required')
        .test('profanity check', 'Profanity is not allowed', (val) => !filter.check(val)),
    userId: Yup.string()
        .required('User ID is Required')
        .min(1, 'User ID is Required'),
});

// custom hook for creating a comment on a review
const useCreateComment = (reviewId: string) => {

    const { user } = useAuth();

    const toast = useToast();

    // handles form state and validation
    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleSubmit,
        resetForm
    } = useFormik<CommentInput>({
        initialValues: {
            reviewId,
            content: '',
            userId: user?.uid || ''
        },
        validationSchema: CommentSchema,
        onSubmit: async values => {
            if(!user) return;
            const success = await addComment(values);
            if(success) {
                toast({
                    title: 'Comment Added',
                    description: 'Your comment has been added to the review.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Error',
                    description: 'There was an error adding your comment.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            resetForm();
        },
    });

    // set the user id when the user changes
    useEffect(() => {
        if(!user) return;
        setFieldValue('userId', user?.uid || '');
    }, [setFieldValue, user]);

    return {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleSubmit,
        disabled: Object.keys(errors).length > 0 || !user,
    }
}

export default useCreateComment