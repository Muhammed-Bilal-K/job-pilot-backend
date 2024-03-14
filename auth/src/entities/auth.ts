interface Auth{
    _id?:string,
    fullname:string,
    username:string,
    email:string,
    password?:string,
    isBlock: boolean;
    credentials?:string
}

export default Auth