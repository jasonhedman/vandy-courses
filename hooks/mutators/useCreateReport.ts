import {useFormik} from "formik";

import useAuth from "@/hooks/auth/useAuth";

import {addReport} from "@/services/reports";

import * as Yup from 'yup';
import {ObjectSchema} from "yup";

import { ReportInput, ReportType } from "@/types/Report";
import {useEffect} from "react";
import {useToast} from "@chakra-ui/react";

const ReportSchema: ObjectSchema<ReportInput> = Yup.object().shape({
    userId: Yup.string()
        .required('User ID is Required'),
    reviewId: Yup.string()
        .required('Review ID is Required'),
    type: Yup.mixed<ReportType>().oneOf(Object.values(ReportType))
        .required('Report Type is Required'),
    description: Yup.string()
        .required('Description is Required'),
});


const useCreateReport = (reviewId: string) => {

    const { user } = useAuth();

    const toast = useToast();
    
    const {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleSubmit
    } = useFormik<ReportInput>({
        initialValues: {
            userId: user?.uid || "",
            reviewId,
            type: ReportType.INAPPROPRIATE,
            description: "",
        },
        validationSchema: ReportSchema,
        onSubmit: async (values: ReportInput) => {
            const success = await addReport(values)
            if (success) {
                toast({
                    title: "Report submitted.",
                    description: "Thank you for your feedback.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "An error occurred.",
                    description: "Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        },
    });

    useEffect(() => {
        setFieldValue("userId", user?.uid || "");
    }, [user?.uid])

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

export default useCreateReport