import Header from "../components/Header";
import Drawer from "../components/Drawer";
import StickyNote from "../components/StickyNote";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchStickyNotes, addStickyNote, createStickyNote, deleteStickyNote, removeStickyNote, updateStickyNote } from "../redux/slices/stickySlice";
import StickyNoteSkeleton from "../components/StickyNoteSkeleton";
import { IStickyNote } from "../types/types";

const StickyPage = () => {
    const dispatch = useAppDispatch()
    const {stickyNotes, fetching} = useAppSelector(state => state.stickyNote)
    const [toggleColorOverlay, setToggleColorOverlay] = useState({state:false, id:''})
    const [stickyText, setStickyText] = useState('')
    const [updateColor, setUpdateColor] = useState('')

    useEffect(() => {
        dispatch(fetchStickyNotes())
    },[])

    useEffect(() => {
        let note:IStickyNote | null = null
        for(const sNote of stickyNotes){
            if(sNote._id === toggleColorOverlay.id){
                note = sNote
            }
        }

        if(!note){
            return;
        }

        updateNote(note._id, note.content, note.color, note.createdAt)
    },[updateColor])

    const updateNote = (id:string, content:string, color:string, createdAt:string) => {
        setIsEditing({state:false, id:''})
        setToggleColorOverlay({state:false, id:''})
        if(!stickyText && !updateColor){
            return
        }

        if(!createdAt){
            dispatch(createStickyNote({
                content: stickyText,
                color: updateColor && updateColor !== color ? updateColor : color
            }))
            setStickyText('')
            setUpdateColor('')
        }else{
            const formData: {color?:string, content?:string} = {};
            if (stickyText && stickyText !== content) {
                formData.content = stickyText;
            }
            if (updateColor && updateColor !== color) {
                formData.color = updateColor;
            }
            if (Object.keys(formData).length > 0) {
                dispatch(updateStickyNote({ id, formData }));
            }
            setStickyText('')
            setUpdateColor('')
        }
    }


    const deleteNote = (id:string, createdAt:string) => {
        if(!createdAt){
            dispatch(removeStickyNote())
        }else{
            dispatch(deleteStickyNote(id))
        }
    }
    

    const [isEditing, setIsEditing] = useState({state:false, id:''})

    return (
        <div className="flex w-full h-screen text-white">
            <Drawer/>
            <div className="flex flex-col bg-custom-drawerBlack flex-1">
                <Header/>
                <div className="flex flex-col items-center bg-custom-bgBlack rounded-t-md w-full h-[90%] overflow-y-auto gap-12 pb-8">
                    <div className="w-[90%] flex flex-col items-start gap-6 mt-4 border-b border-custom-drawerBorder pb-8">
                        <h1 className="font-semibold text-xl self-center">My sticky notes</h1>
                        <p className="text-left font-extralight">Sticky notes are a versatile and handy tool for capturing quick thoughts, reminders, and to-do lists. They provide a simple way to organize ideas and tasks visually, helping you stay on top of your priorities. Whether used for brainstorming, tracking goals, or leaving yourself important reminders, sticky notes can transform your workspace into an efficient and creative environment. Their bright colors and easy repositioning make them perfect for both personal and professional use, ensuring you never lose sight of what's important.</p>
                        <Button text="New note" width="w-28" onClick={() => dispatch(addStickyNote())}/>
                    </div>
                    <div className="flex flex-wrap gap-6 text-black w-[90%]">
                        {fetching && <StickyNoteSkeleton cards={4}/>}
                        {stickyNotes.map((stickyNote) => (
                            <StickyNote content={stickyNote.content} color={stickyNote.color} id={stickyNote._id} createdAt={stickyNote.createdAt} isEditing={isEditing} setIsEditing={setIsEditing} toggleColorOverlay={toggleColorOverlay} setToggleColorOverlay={setToggleColorOverlay} setUpdateColor={setUpdateColor} setStickyText={setStickyText} updateNote={updateNote} deleteNote={deleteNote}/>
                        ))}
                    </div>      
                </div>
            </div>
        </div>
    );
}
 
export default StickyPage;