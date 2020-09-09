export interface ServiceParams{
    url:string,
    body?:any,
    method:"Get" | "Post",
    headers?:{
        Authorization?:string,
        "Access-Control-Allow-Origin"?:any
    }
}