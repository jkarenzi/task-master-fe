import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LuPencil } from "react-icons/lu";
import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import { changeEmailSchema, changeFullNameSchema, changePasswordSchema, passwordSchema } from "../validationSchema/profileMgtSchema";
import { change2faStatus, changeEmail, changeFullName, changePassword, changeProfileImg, removeProfileImg, resetImageStatus, resetStatus } from "../redux/slices/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { IoAdd } from "react-icons/io5";

export interface emailFormData {
    password:string,
    newEmail:string
}

export interface passwordFormData {
    oldPassword:string,
    newPassword:string
}

export interface nameFormData {
    fullName:string
}

export interface twoFAFormData {
    status:boolean
}

const Settings = () => {
    const dispatch = useAppDispatch()
    const {userInfo, isLoadingName, isLoadingPassword, isLoadingImage, status, imageStatus} = useAppSelector(state => state.user)
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [toggleImageMenu, setToggleImageMenu] = useState(false)
    const [toggleDeleteImage, setToggleDeleteImage] = useState(false)
    const [toggleChangeImage, setToggleChangeImage] = useState(false)
    const [toggleViewImage, setToggleViewImage] = useState(false)
    const [togglePasswordOverlay, setTogglePasswordOverlay] = useState(false)
    const [currentField, setCurrentField] = useState('')
    const [image, setImage] = useState<File|null>(null)
    const [uri, setUri] = useState<string | undefined | null>()

    useEffect(() => {
        if(imageStatus === 'successful'){
            setImage(null)
            setUri(null)
            setToggleChangeImage(false)
            setToggleDeleteImage(false)
            setToggleImageMenu(false)
            dispatch(resetImageStatus())
        }
    },[imageStatus])

    useEffect(() => {
        if(status === 'successful'){
            if(currentField === 'newEmail'){
                emailForm.resetForm() 
                setTogglePasswordOverlay(false)
                setIsEditingEmail(false)
            }else if(currentField === 'newPassword'){
                changePasswordForm.resetForm()
                setTogglePasswordOverlay(false)
                setIsEditingPassword(false)
            }else {
                nameForm.resetForm()
                setIsEditingName(false)
            }          
            dispatch(resetStatus())
            setCurrentField('')
        }
        passwordForm.resetForm()      
    },[status])

    const emailInitValues = {
        newEmail:userInfo!.email
    }

    const changePasswordInitValues = {
        newPassword:''
    }

    const passwordInitValues = {
        password:''
    }

    const nameInitValues = {
        fullName: userInfo!.fullName
    }

    const handleFieldUpdate = (field:string) => {
        setCurrentField(field);
        setTogglePasswordOverlay(true)
      };

    const emailForm = useFormik({
        initialValues: emailInitValues,
        enableReinitialize: true,
        onSubmit: () => handleFieldUpdate('newEmail'),
        validationSchema: changeEmailSchema
    })

    const passwordForm = useFormik({
        initialValues: passwordInitValues,
        onSubmit: (values) => {
            if(currentField === 'newEmail'){
                dispatch(changeEmail({
                    ...values,
                    newEmail: emailForm.values.newEmail
                }))
            }else if(currentField === 'newPassword'){
                dispatch(changePassword({
                    oldPassword: values.password,
                    newPassword: changePasswordForm.values.newPassword
                }))
            }
            
        },
        validationSchema: passwordSchema
    })

    const changePasswordForm = useFormik({
        initialValues: changePasswordInitValues,
        onSubmit: () => handleFieldUpdate('newPassword'),
        validationSchema: changePasswordSchema
    })

    const nameForm = useFormik({
        initialValues: nameInitValues,
        enableReinitialize: true,
        onSubmit: (formData: nameFormData) => {
            dispatch(changeFullName(formData))
        },
        validationSchema: changeFullNameSchema
    })

    const processImg = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        setImage(file)
        if (file) {
            const reader = new FileReader();
    
            reader.onload = function(e) {
                //@ts-expect-error types
                setUri(e.target!.result)
            };
    
            reader.readAsDataURL(file);
        }
    }

    const handleImageUpload = () => {
        const formData = new FormData()
        formData.append('image', image!)
        dispatch(changeProfileImg(formData))
    }

    return (
        <div className="flex w-full h-screen text-white">
            { toggleViewImage && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-custom-drawerBlack w-80 h-80">
                    <div className="flex items-center justify-end w-full pr-2 py-3 border-b border-custom-drawerBorder">
                        <IoClose color="#ffffff" size='25' onClick={() => setToggleViewImage(false)} className="cursor-pointer"/>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-48 h-48 flex items-center justify-center rounded-full overflow-hidden">
                            <img src={userInfo
                            ?.profileImg.url} className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>}
            { toggleChangeImage && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-custom-drawerBlack w-80 h-[22rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-3 py-3 border-b border-custom-drawerBorder">
                        <h2>Change Image</h2>
                        <IoClose color="#ffffff" size='25' onClick={() => setToggleChangeImage(false)} className="cursor-pointer"/>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 items-center justify-center px-4">
                        {!image && !uri && <div className="relative flex items-center justify-center border border-dotted border-white rounded-full w-16 h-16">
                            <input type="file" accept="image/*" className="w-full h-full absolute opacity-0 cursor-pointer" onChange={processImg}/>
                            <IoAdd size={25} color="#ffffff"/>
                        </div>}
                        {!image && !uri && <h2 className="text-sm text-center">Choose an image from your library or drag and drop</h2>}
                        {image && uri && <div className="relative">
                            <div className="w-48 h-48 flex items-center justify-center rounded-full overflow-hidden">
                                <img src={uri} className="w-full h-full object-cover"/>
                            </div>
                            <div className="absolute top-0 right-5 flex items-center justify-center bg-custom-drawerIconInactive rounded-full p-2 cursor-pointer" onClick={() => {setImage(null); setUri("")}}>
                                <IoClose color="#ffffff" size='17'/>
                            </div>
                        </div>}
                        {image && uri && <button className="w-20 h-10 flex items-center justify-center text-white bg-custom-blue rounded-md mt-4" onClick={handleImageUpload}>{isLoadingImage ? <ClipLoader size='15' color="#ffffff"/> : 'Submit'}</button>}
                    </div>
                </div>
            </div>}
            { toggleDeleteImage && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-custom-drawerBlack w-[30rem] h-48">
                    <div className="flex items-center w-full pl-4 py-3 border-b border-custom-drawerBorder">
                        Remove profile image?
                    </div>
                    <div className="flex flex-col w-full  items-start gap-8 pb-6  px-4">
                        <h2 className="text-white text-left m-0">This will remove your current profile image.</h2>
                        <div className="w-full flex items-center justify-end gap-6">
                            <button className="w-20 h-10 flex items-center justify-center text-white bg-transparent border border-white rounded-md" onClick={() => setToggleDeleteImage(false)}>Cancel</button>
                            <button className="w-20 h-10 flex items-center justify-center text-white bg-red-500 rounded-md" onClick={() => dispatch(removeProfileImg())}>{isLoadingImage ? <ClipLoader size='15' color="#ffffff"/> : 'Remove'}</button>
                        </div>
                    </div>
                </div>
            </div>}
            <Drawer/>
            { togglePasswordOverlay && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-custom-drawerBlack w-80 min-h-80">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Verify its you</h2>
                        <IoClose color="#ffffff" size='25' onClick={() => setTogglePasswordOverlay(false)} className="cursor-pointer"/>
                    </div>
                    <div className="flex w-[90%] items-center flex-col gap-6 pb-8 pt-6">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
                            <img src={userInfo
                            ?.profileImg.url} className="w-full h-full object-cover"/>
                        </div>
                        <form className="flex flex-col w-full gap-6" onSubmit={passwordForm.handleSubmit}>
                            <div className="flex flex-col w-full gap-2">
                                <label className="font-semibold text-sm">Enter your Password</label>
                                <InputField id="password" type="password" placeholder="" error={(passwordForm.touched.password && passwordForm.errors.password)?true:false} {...passwordForm.getFieldProps('password')}/>
                                {passwordForm.touched.password && passwordForm.errors.password ? (
                                <div className="text-red-500 text-sm">{passwordForm.errors.password}</div>
                                ) : null}
                            </div>
                            <Button text="Submit" disabled={isLoadingPassword}/>
                        </form>
                    </div>
                </div>
            </div> }
            <div className="flex flex-col bg-custom-drawerBlack flex-1">
                <Header/>
                <div className="flex justify-center bg-custom-bgBlack rounded-t-md w-full h-[90%] py-4">
                    <div className="flex items-center justify-center w-[30%] border-r border-custom-drawerBorder">
                        <div className="relative flex">
                            <div className="w-40 h-40 flex items-center justify-center rounded-full overflow-hidden">
                                <img src={userInfo
                                ?.profileImg.url} className="w-full h-full object-cover"/>
                            </div>
                            <div className="absolute top-28 right-0 flex items-center justify-center rounded-full bg-custom-drawerIconInactive hover:bg-custom-blue p-2 cursor-pointer" onClick={() => setToggleImageMenu(!toggleImageMenu)}>
                                <LuPencil  color="white" size="15"/>
                            </div>
                            {toggleImageMenu && <div className="absolute top-[9.5rem] right-0 flex flex-col w-32 bg-custom-drawerBlack text-sm rounded-lg">
                                <div className="flex flex-col p-1 border-b border-custom-drawerBorder">
                                    <div className="hover:bg-custom-drawerIconInactive flex items-center w-full h-8 pl-2 rounded-md cursor-pointer" onClick={() => setToggleDeleteImage(true)}>Remove Image</div>
                                </div>
                                <div className="flex flex-col p-1">
                                    <div className="hover:bg-custom-drawerIconInactive flex items-center w-full h-8 pl-2 rounded-md cursor-pointer" onClick={() => setToggleViewImage(true)}>View image</div>
                                    <div className="hover:bg-custom-drawerIconInactive flex items-center w-full h-8 pl-2 rounded-md cursor-pointer" onClick={() => setToggleChangeImage(true)}>Change image</div>  
                                </div> 
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-[70%] overflow-y-auto pb-8 pl-8">
                        <h1 className="self-start mt-4 text-lg">Edit profile</h1>
                        <div className="flex flex-col gap-8 w-[80%] mt-8">
                            <form className="flex flex-col w-full" onSubmit={nameForm.handleSubmit}>
                                <label className="font-semibold text-sm mb-2">Full Name</label>
                                <InputField id="fullName" type="text" placeholder="" editMode={isEditingName} error={(nameForm.touched.fullName && nameForm.errors.fullName)?true:false} {...nameForm.getFieldProps('fullName')}/>
                                {nameForm.touched.fullName && nameForm.errors.fullName && isEditingName ? (
                                <div className="text-red-500 text-sm mt-2">{nameForm.errors.fullName}</div>
                                ) : null}
                                <div className="flex items-center justify-end gap-4 mt-4">
                                    {!isEditingName &&<Button text="Edit" color="transparent" borderColor="white" width="w-14" height="h-8" textSize="text-sm" onClick={() => setIsEditingName(true)}/>}
                                    {isEditingName && <Button text="Cancel" color="transparent" borderColor="white" width="w-16" height="h-8" textSize="text-sm" onClick={() => {nameForm.resetForm(); setIsEditingName(false)}}/>}
                                    {isEditingName && <Button text="Save" textSize="text-sm" width="w-14" height="h-8" disabled={isLoadingName}/>}
                                </div>
                            </form>
                            <form className="flex flex-col w-full" onSubmit={emailForm.handleSubmit}>
                                <label className="font-semibold text-sm mb-2">Email</label>
                                <InputField id="newEmail" type="email" placeholder="" editMode={isEditingEmail} error={(emailForm.touched.newEmail && emailForm.errors.newEmail)?true:false} {...emailForm.getFieldProps('newEmail')}/>
                                {emailForm.touched.newEmail && emailForm.errors.newEmail && isEditingEmail ? (
                                <div className="text-red-500 text-sm mt-2">{emailForm.errors.newEmail}</div>
                                ) : null}
                                <div className="flex items-center justify-end gap-4 mt-4">
                                    {!isEditingEmail &&<Button text="Edit" color="transparent" borderColor="white" width="w-14" height="h-8" textSize="text-sm" onClick={() => setIsEditingEmail(true)}/>}
                                    {isEditingEmail && <Button text="Cancel" color="transparent" borderColor="white" width="w-16" height="h-8" textSize="text-sm" onClick={() => {emailForm.resetForm(); setIsEditingEmail(false)}}/>}
                                    {isEditingEmail && <Button text="Save" textSize="text-sm" width="w-14" height="h-8" onClick={() => setTogglePasswordOverlay(true)}/>}
                                </div>
                            </form>
                            <form className="flex flex-col w-full" onSubmit={changePasswordForm.handleSubmit}>
                                <label className="font-semibold text-sm mb-2">Password</label>
                                <InputField id="newPassword" type="password" placeholder="************" editMode={isEditingPassword} error={(changePasswordForm.touched.newPassword && changePasswordForm.errors.newPassword)?true:false} {...changePasswordForm.getFieldProps('newPassword')}/>
                                {changePasswordForm.touched.newPassword && changePasswordForm.errors.newPassword && isEditingPassword ? (
                                <div className="text-red-500 text-sm mt-2">{changePasswordForm.errors.newPassword}</div>
                                ) : null}
                                <div className="flex items-center justify-end gap-4 mt-4">
                                    {!isEditingPassword &&<Button text="Edit" color="transparent" borderColor="white" width="w-14" height="h-8" textSize="text-sm" onClick={() => setIsEditingPassword(true)}/>}
                                    {isEditingPassword && <Button text="Cancel" color="transparent" borderColor="white" width="w-16" height="h-8" textSize="text-sm" onClick={() => {changePasswordForm.resetForm(); setIsEditingPassword(false)}}/>}
                                    {isEditingPassword && <Button text="Save" textSize="text-sm" width="w-14" height="h-8"/>}
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col w-[90%] gap-4 mt-8">
                            <h1 className="text-lg">Two Factor Authentication</h1>
                            <p className="font-thin text-sm">Require an authentication code as an additional step when logging in with an email and password.</p>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm">Off</h3>
                                <div className={`flex items-center ${userInfo?.twoFactorAuth?.isEnabled ? 'justify-end bg-custom-blue':'justify-start bg-custom-drawerIconInactive'} rounded-xl p-1 w-12`}>
                                    <div className="w-4 h-4 rounded-full bg-white cursor-pointer" onClick={() => dispatch(change2faStatus({status:!(userInfo!.twoFactorAuth!.isEnabled)}))}></div>
                                </div>
                                <h3 className="text-sm">On</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Settings;