interface Auth{
    _id?:string,
    fullname:string,
    username:string,
    email:string,
    password?:string,
    role:string,
    isBlock?: boolean,
    credentials?:string
}

export default Auth