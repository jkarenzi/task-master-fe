import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { twoFactorSchema } from "../../validationSchema/authSchema";
import { FormikHelpers, useFormik } from "formik";
import axios from "../../api/axiosInstance";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/slices/userSlice";
import { errorToast, successToast } from "../../utils/toast";
import { AxiosError } from "axios";
import { ApiResponse } from "../../types/types";


interface formValues {
    twoFactorCode:string
}

const initialValues:formValues = {
    twoFactorCode:''
}

const TwoFactorAuth = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    const userId = searchParams.get('id')
    const email = searchParams.get('email')

    const handleSubmit = async(formData:formValues,{setSubmitting}:FormikHelpers<formValues>) => {
        try{
            const response = await axios.post(`/auth/verify_code/${userId}`, formData)
            setSubmitting(false)
            dispatch(login(response.data.token))
        }catch(err){
            const error = err as AxiosError
            setSubmitting(false)
            errorToast((error.response!.data as ApiResponse).message!)
        }
    }

    const requestNewCode = async() => {
        try{
            const response = await axios.post(`/auth/request_new_code/${userId}`)
            successToast(response.data.message)
        }catch(err){
            const error = err as AxiosError
            errorToast((error.response!.data as ApiResponse).message!)
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema:twoFactorSchema
    })

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen w-full bg-custom-bgBlack text-white">
            <div className="flex flex-col items-start rounded-lg border border-custom-borderGrey w-[25rem] px-6 pt-4 pb-20">
                <h1 className="text-custom-blue font-semibold text-2xl">Two Factor Authentication</h1>
                <h2 className="mt-8 font-light text-lg">Enter the six digit verification code sent to {email}</h2>
                <form className="w-full flex flex-col gap-16 mt-8" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col w-full gap-2">
                        <label className="font-semibold text-sm">Email verification code</label>
                        <InputField id="twoFactorCode" type="text" placeholder="" {...formik.getFieldProps('twoFactorCode')} error={(formik.touched.twoFactorCode && formik.errors.twoFactorCode)?true:false}/>
                        {formik.touched.twoFactorCode && formik.errors.twoFactorCode ? (
                        <div className="text-red-500 text-sm">{formik.errors.twoFactorCode}</div>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Button text="Submit" disabled={formik.isSubmitting}/> 
                        <h3 className="text-custom-blue text-sm cursor-pointer" onClick={requestNewCode}>Request new code</h3>
                    </div>
                </form>  
            </div>
        </div>
    );
}
 
export default TwoFactorAuth;