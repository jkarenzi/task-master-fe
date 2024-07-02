export interface ApiResponse {
    status: string,
    message?: string,
    data?:{
        [key:string]:unknown
    }
}