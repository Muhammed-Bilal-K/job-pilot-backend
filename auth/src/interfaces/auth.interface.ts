export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  fullname : string;
  username : string;
  email : string;
  role : string;
  password : string;
  confirmpassword? : string;
  isBlock? : boolean;
}

export interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}