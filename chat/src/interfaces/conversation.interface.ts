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

export interface IRequestEmail{
  email: string;
}

export interface InputPass {
  email : string;
  npassword: string;
}

export interface IResendOtp{
  email : string;
}