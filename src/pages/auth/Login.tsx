import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { loginSchema } from "../../validationSchema/authSchema";
import {FormikHelpers, useFormik} from 'formik'
import axios from '../../api/axiosInstance';
import { login } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { errorToast } from "../../utils/toast";
import { ApiResponse } from "../../types/types";
import { AxiosError } from "axios";


interface formValues {
    email:string,
    password:string
}

const initialValues:formValues = {
    email:'',
    password:''
}


const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()  
    const handleLogin = async(formData:formValues,{setSubmitting}:FormikHelpers<formValues>) => {
        try{
            const response = await axios.post('/auth/login', formData)
            setSubmitting(false)
            if(!response.data.token){
                navigate(`/auth/2fa?id=${response.data.data._id}&&email=${response.data.data.email}`)
            }else{
                dispatch(login(response.data.token))
                navigate('/notes')
            }           
        }catch(err){
            const error = err as AxiosError
            setSubmitting(false)
            errorToast((error.response!.data as ApiResponse).message!)
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleLogin,
        validationSchema:loginSchema
    })

    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full bg-custom-bgBlack text-white py-8">
            <div className="flex flex-col items-start rounded-lg border border-custom-borderGrey w-[25rem] px-6 pt-4 pb-20">
                <h1 className="text-custom-blue font-semibold text-2xl">TaskMaster</h1>
                <h2 className="mt-8 font-light text-lg">Signin to continue</h2>
                <form className="w-full flex flex-col gap-12 mt-8" onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex flex-col w-full gap-2">
                            <label className="font-semibold text-sm">Email</label>
                            <InputField id="email" type="email" placeholder="" error={(formik.touched.email && formik.errors.email)?true:false} {...formik.getFieldProps('email')}/>
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
                        <Button text="Login" disabled={formik.isSubmitting}/>
                        <h3 className="text-custom-blue text-sm">Forgot password?</h3>
                    </div>
                </form>  
            </div>
            <Link to='/auth/signup' className="text-custom-blue text-lg">Create a TaskMaster account</Link>
        </div>  
    );
}
 
export default Login;