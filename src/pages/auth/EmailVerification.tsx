import { useParams } from "react-router";
import Button from "../../components/Button";
import axios from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ApiResponse } from "../../types/types";



const EmailVerification = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const [verificationStatus, setVerificationStatus] = useState('')
    const verifyEmail = async() => {
        try{
            const response = await axios.post(`/auth/verify_email/${token}`)
            setVerificationStatus(response.data.status)
        }catch(err){
            const error = err as AxiosError
            errorToast((error.response!.data as ApiResponse).message!)
            setVerificationStatus((error.response!.data as ApiResponse).status)
        }
    }

    useEffect(() => {
        (async() => {
            await verifyEmail()
        })()
    },[])

    const message2:string = 'Sorry, we were not able to verify your email because this link is expired. Please request a new link'
    const message:string = 'Your email has been successfully verified'
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen w-full bg-custom-bgBlack text-white">
            { verificationStatus && <div className="flex flex-col items-center gap-8 rounded-lg border border-custom-borderGrey w-3/5 px-6 pt-4 pb-8">
                <h1 className="text-custom-blue font-semibold text-2xl">TaskMaster</h1>
                <div className="relative flex items-center justify-center bg-custom-blue w-28 h-28 rounded-full">
                    {verificationStatus === 'success'?
                        <img src="/images/success.png" width='80' height='80' className="absolute left-8 top-0" alt="success"/>:
                        <img src="/images/fail.png" width='80' height='80' alt="fail"/>
                    }
                </div>
                <p className="w-3/5 text-center">{verificationStatus === 'success'? message: message2}</p>
                <Button width="w-80" text='Back to Login' onClick={() => navigate('/auth/login')}/>
            </div>}
        </div>
    );
}
 
export default EmailVerification;