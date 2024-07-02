import { toast } from 'react-toastify';

export const successToast = (msg:string) => {
    return (
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
        })
    );
}
 
export const errorToast = (msg:string) => {
    return (
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT, 
        })
    )
}