interface IAuth{
    _id?:string,
    fullname:string,
    username:string,
    email:string,
    password?:string,
    role:string,
    isBlock?: boolean,
    credentials?:string
}

interface Iadmin{
    email:string,
    password?:string,
}

export { IAuth, Iadmin };