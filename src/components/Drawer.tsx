import { IoHome } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { HiClipboardList } from "react-icons/hi";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Drawer = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {userInfo} = useAppSelector(state => state.user)
    return (
        <div className="flex min-w-16 h-screen bg-custom-drawerBlack">
            <div className="w-16 flex flex-col items-center justify-between border-r border-custom-drawerBorder py-12">
                <div className="flex flex-col items-center w-full gap-8">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${location.pathname === '/tasks'?'bg-custom-blue':'bg-custom-drawerIconInactive'} cursor-pointer`} onClick={() => navigate('/')}>
                        <IoHome size='17' color="#ffffff" title="home"/>
                    </div>
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${location.pathname === '/tasks'?'bg-custom-blue':'bg-custom-drawerIconInactive'} cursor-pointer`} onClick={() => navigate('/tasks')}>
                        <HiClipboardList size='20' color="#ffffff" title="tasks"/>
                    </div> 
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${location.pathname === '/notes'?'bg-custom-blue':'bg-custom-drawerIconInactive'} cursor-pointer`} onClick={() => navigate('/notes')}>
                        <IoGrid size='17' color="#ffffff" title="notes"/>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full gap-8">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${location.pathname === '/settings'?'bg-custom-blue':'bg-custom-drawerIconInactive'} cursor-pointer`} onClick={() => navigate('/settings')}>
                        <IoMdSettings size='20' color="#ffffff" title="settings"/>
                    </div> 
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden cursor-pointer" onClick={() => {dispatch(logout()); navigate('/')}}>
                        <img src={userInfo?.profileImg.url} alt="profile" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Drawer;