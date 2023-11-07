import {useFormik} from "formik";

import useAuth from "@/hooks/auth/useAuth";

import {addReport} from "@/services/reports";

import * as Yup from 'yup';
import {ObjectSchema} from "yup";

import { ReportInput, ReportType } from "@/types/Report";

const ReportSchema: ObjectSchema<ReportInput> = Yup.object().shape({
    reviewId: Yup.string()
        .required('Review ID is Required'),
    type: Yup.mixed<ReportType>().oneOf(Object.values(ReportType))
        .required('Report Type is Required'),
    description: Yup.string()
        .required('Description is Required'),
});


const useCreateReport = (reviewId: string) => {

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
            reviewId,
            type: ReportType.INAPPROPRIATE,
            description: "",
        },
        validationSchema: ReportSchema,
        onSubmit: async (values: ReportInput) => {
            await addReport(values);
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

export default useCreateReport