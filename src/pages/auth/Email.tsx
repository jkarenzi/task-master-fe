import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";

const Email = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email')
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen w-full bg-custom-bgBlack text-white">
            <div className="flex flex-col items-center gap-8 rounded-lg border border-custom-borderGrey w-3/5 px-6 pt-4 pb-8">
                <h1 className="text-custom-blue font-semibold text-2xl">TaskMaster</h1>
                <div className="flex items-center justify-center bg-custom-blue w-28 h-28 rounded-full">
                    <img src="/mail.png" width='70' height='70'/>
                </div>
                <h2 className="text-2xl font-semibold">Verify your email address</h2>
                <p className="w-[70%] text-center font-light">
                    We have sent a verification link to <span className="font-semibold">{email}</span>. Click on the link to complete the verification process. You might need to check your spam folder.
                </p>
                <Button width="w-80" text='Back to Login' onClick={() => navigate('/auth/login')}/>
            </div>
        </div>
    );
}
 
export default Email;