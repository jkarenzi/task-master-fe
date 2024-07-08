export interface ApiResponse {
    status: string,
    message?: string,
    data?:{
        [key:string]:unknown
    }
}

export interface IStickyNote {
    _id:string,
    userId:string,
    color:string,
    content:string,
    createdAt: string,
    updatedAt: string,
    __v: number 
}

export interface User {
    _id:string,
    fullName: string,
    email: string,
    password: string,
    role: string,
    profileImg: {
      publicId: string,
      url?: string
    },
    isVerified: boolean,
    twoFactorAuth: {
        isEnabled: boolean,
        code: number | null,
    },
    createdAt: string,
    updatedAt: string,
    __v: number 
  }