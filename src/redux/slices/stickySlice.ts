import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import { ApiResponse, IStickyNote } from "../../types/types";
import { AxiosError } from "axios";
import { errorToast } from "../../utils/toast";


export interface InitStickyState {
    fetching:boolean,
    loading:boolean,
    stickyNotes: IStickyNote[],
    colors: string[]
}

interface createStickyNoteFormData {
    content: string,
    color: string
}

interface updateStickyNoteFormData {
    content?: string,
    color?: string
}

interface updateData {
    id: string,
    formData: updateStickyNoteFormData
}


const initialState:InitStickyState = {
    fetching: false,
    loading:false,
    stickyNotes:[],
    colors:[
        '#FFA3A3',
        '#A3DEFF',
        '#FFFBA3',
        '#CFFF81',
        '#FF60C9',
        '#B885F9',
        '#FFBA54',
        '#52F5FF'
    ]
}

export const fetchStickyNotes = createAsyncThunk<IStickyNote[]>('stickyNotes/fetch', async(_, thunkAPI) => {
    try{
        const response = await axios.get('/sticky_notes')
        return response.data.data as IStickyNote[]
    }catch(err){
        const error = err as AxiosError
        const errorMessage = (error.response!.data as ApiResponse).message!
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const createStickyNote = createAsyncThunk<IStickyNote, createStickyNoteFormData>('stickyNotes/create', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('/sticky_notes', formData)
        return response.data.data as IStickyNote
    }catch(err){
        const error = err as AxiosError
        const errorMessage = (error.response!.data as ApiResponse).message!
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const updateStickyNote = createAsyncThunk<IStickyNote, updateData>('stickyNotes/update', async({id, formData}, thunkAPI) => {
    try{
        const response = await axios.patch(`/sticky_notes/${id}`, formData)
        return response.data.data as IStickyNote
    }catch(err){
        const error = err as AxiosError
        const errorMessage = (error.response!.data as ApiResponse).message!
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const deleteStickyNote = createAsyncThunk<string, string>('stickyNotes/delete', async(noteId, thunkAPI) => {
    try{
        await axios.delete(`/sticky_notes/${noteId}`)
        return noteId
    }catch(err){
        const error = err as AxiosError
        const errorMessage:string = (error.response!.data as ApiResponse).message!
        return thunkAPI.rejectWithValue(errorMessage)
    }
})


export const stickySlice = createSlice({
    name: 'stickyNote',
    initialState,
    reducers: {
        addStickyNote: (state) => {
            for(const note of state.stickyNotes){
                if(!note.createdAt){
                    return
                }
            }

            state.stickyNotes.splice(0,0,{
                _id:crypto.randomUUID(),
                userId: '',
                content:'',
                color:'#FFA3A3',
                createdAt:'',
                updatedAt:'',
                __v: 0
            })
        },
        removeStickyNote: (state) => {
            for(const note of state.stickyNotes){
                if(!note.createdAt){
                    state.stickyNotes.splice(state.stickyNotes.indexOf(note),1)
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStickyNotes.pending, (state) => {
            state.fetching = true
        })
        .addCase(fetchStickyNotes.fulfilled, (state, action) => {
            state.fetching = false
            state.stickyNotes = action.payload
        })
        .addCase(fetchStickyNotes.rejected, (state, action) => {
            state.fetching = false
            errorToast(action.payload as string)
        })
        .addCase(createStickyNote.pending, (state) => {
            state.loading = true
        })
        .addCase(createStickyNote.fulfilled, (state, action) => {
            state.loading = false
            state.stickyNotes = state.stickyNotes.map((stickyNote) => {
                if(!stickyNote.createdAt){
                    return action.payload
                }else{
                    return stickyNote
                }
            })
        })
        .addCase(createStickyNote.rejected, (state, action) => {
            state.loading = false
            errorToast(action.payload as string)
        })
        .addCase(updateStickyNote.pending, (state) => {
            state.loading = true
        })
        .addCase(updateStickyNote.fulfilled, (state, action) => {
            state.loading = false
            state.stickyNotes = state.stickyNotes.map((stickyNote) => {
                if(stickyNote._id === action.payload._id){
                    return action.payload
                }else{
                    return stickyNote
                }
            })
        })
        .addCase(updateStickyNote.rejected, (state, action) => {
            state.loading = false
            errorToast(action.payload as string)
        })
        .addCase(deleteStickyNote.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteStickyNote.fulfilled, (state, action) => {
            state.loading = false
            state.stickyNotes = state.stickyNotes.filter((stickyNote) => stickyNote._id !== action.payload)
        })
        .addCase(deleteStickyNote.rejected, (state, action) => {
            state.loading = false
            errorToast(action.payload as string)
        })
    }
});

export const { addStickyNote, removeStickyNote } = stickySlice.actions
  
  
export default stickySlice.reducer;