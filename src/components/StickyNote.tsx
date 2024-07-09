import { GoKebabHorizontal } from "react-icons/go";
import { IoClose } from "react-icons/io5";


interface stickyProps {
    id: string,
    content: string,
    color: string,
    createdAt: string,
    isEditing: {
        state:boolean,
        id: string
    },
    setIsEditing: React.Dispatch<React.SetStateAction<{
        state:boolean,
        id: string
    }>>,
    toggleColorOverlay: {state:boolean, id:string},
    setToggleColorOverlay: React.Dispatch<React.SetStateAction<{
        state:boolean,
        id: string
    }>>,
    setUpdateColor: React.Dispatch<React.SetStateAction<string>>,
    setStickyText: React.Dispatch<React.SetStateAction<string>>,
    updateNote: (id:string, content:string, color:string, createdAt:string) => void,
    deleteNote: (id:string, createdAt:string) => void
}

const StickyNote = ({id, content, color, createdAt, isEditing, setIsEditing, toggleColorOverlay, setToggleColorOverlay, setUpdateColor, setStickyText, updateNote, deleteNote}:stickyProps) => {
    return (
        <div className={`relative flex flex-col items-center gap-4 w-60 h-60 bg-[${color}] pb-2`} onBlur={() => updateNote(id, content, color, createdAt)}>
            <div className="w-[90%] py-2 flex items-center justify-end gap-2">
                <GoKebabHorizontal size='20' className="cursor-pointer" onClick={() => setToggleColorOverlay({state:!toggleColorOverlay.state, id:id})}/>
                <IoClose size='20' className="cursor-pointer" onClick={() => deleteNote(id, createdAt)} title="deleteNote"/>
            </div>
            {(toggleColorOverlay.state && toggleColorOverlay.id === id) && <div className="flex items-center flex-wrap gap-2 absolute top-8 bg-white w-full z-30 p-2">
                <div className="bg-[#FFA3A3] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#FFA3A3')}></div>
                <div className="bg-[#A3DEFF] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#A3DEFF')}></div>
                <div className="bg-[#FFFBA3] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#FFFBA3')}></div>
                <div className="bg-[#CFFF81] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#CFFF81')}></div>
                <div className="bg-[#FF60C9] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#FF60C9')}></div>
                <div className="bg-[#B885F9] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#B885F9')}></div>
                <div className="bg-[#FFBA54] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#FFBA54')}></div>
                <div className="bg-[#52F5FF] flex items-center justify-center rounded-full w-8 h-8 cursor-pointer" onClick={() => setUpdateColor('#52F5FF')}></div>
            </div>}
            <div className='w-[90%] h-40 font-chococooky' onClick={() => setIsEditing({state:true, id:id})}>
                {(isEditing.state && isEditing.id === id)?<textarea defaultValue={content} autoFocus onChange={(e) => setStickyText(e.target.value)} className="bg-transparent w-full h-40 border-none outline-none">
                </textarea>:content}
            </div>
        </div>
    );
}
 
export default StickyNote;