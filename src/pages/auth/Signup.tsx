import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { signUpSchema } from "../../validationSchema/authSchema";
import { FormikHelpers, useFormik } from "formik";
import axios from "../../api/axiosInstance";
import { errorToast } from "../../utils/toast";
import { ApiResponse } from "../../types/types";
import { AxiosError } from "axios";


interface formValues {
    fullName:string,
    email:string,
    password:string
}

const initialValues:formValues = {
    fullName:'',
    email:'',
    password:''
}


const Signup = () => {
    const navigate = useNavigate()
    const handleSignup = async(formData:formValues,{setSubmitting}:FormikHelpers<formValues>) => {
        try{
            const response = await axios.post('/auth/signup', formData)
            console.log(response.data)
            setSubmitting(false)
            navigate(`/auth/email?email=${response.data.data.email}`)
        }catch(err){
            const error = err as AxiosError
            setSubmitting(false)
            errorToast((error.response!.data as ApiResponse).message!)
        }  
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSignup,
        validationSchema:signUpSchema
    })

    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full bg-custom-bgBlack text-white py-8">
            <div className="flex flex-col items-start rounded-lg border border-custom-borderGrey w-[25rem] px-6 pt-4 pb-16">
                <h1 className="text-custom-blue font-semibold text-2xl">TaskMaster</h1>
                <h2 className="mt-8 font-light text-lg">Signin to continue</h2>
                <form className="w-full flex flex-col gap-12 mt-8" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold text-sm">Full name</label>
                            <InputField id="fullName" type="text" placeholder="" {...formik.getFieldProps('fullName')} error={(formik.touched.fullName && formik.errors.fullName)?true:false}/>
                            {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold text-sm">Email</label>
                            <InputField id="email" type="email" placeholder="" {...formik.getFieldProps('email')} error={(formik.touched.email && formik.errors.email)?true:false}/>
                            {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold text-sm">Password</label>
                            <InputField id="password" type="password" placeholder="" {...formik.getFieldProps('password')} error={(formik.touched.password && formik.errors.password)?true:false}/>
                            {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 w-full">
                        <Button text="Signup" disabled={formik.isSubmitting}/>
                    </div>
                </form>  
            </div>  
            <Link to='/auth/login' className="text-custom-blue text-lg">Sign into your TaskMaster account</Link>  
        </div>
    );
}
 
export default Signup;