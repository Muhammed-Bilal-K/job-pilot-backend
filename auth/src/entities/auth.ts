interface IAuth{
    _id:string,
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

interface IVerifyCurr{
    _id:string,
    email:string,
    role:string
}

export { IAuth, Iadmin , IVerifyCurr};