export interface IRegisterRequest {
    fullname : string;
    username : string;
    email : string;
    role : string;
    password : string;
    confirmpassword? : string;
    isBlock? : boolean;
  } 

  export interface ICompanyInfo {
    companyId: string;
    organizationType: string;
    industryType: string;
    teamSize: string;
    yearOfEstablished: string;
    companyWebsiteUrl: string;
    country: string;
    state: string;
    companyVision: string;
    socialLinks1: string;
    socialLinks2: string;
  }

  export interface ICompanyInfoCreate {
    companyId: string;
    name: string;
    email: string;
    about: string;
    logo: string;
    banner: string;
  }

  export interface IJobCreateRequest {
    jobTitle : string;
    tags : string;
    jobRole : string;
    maxSalary : string;
    minSalary : string;
    education: string;
    experinece : string;
    jobType:string;
    jobExpireDate : string;
    jobLevel: string;
    applicationNo : string;
    location : string;
    state : string;
    jobDescription : string; 
  }

  export interface IPlan {
    _id: string;
    name: string;
    description: string;
    amount: string;
    features: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    type: string;
  }
  
  export interface IPlanData {
    plan: IPlan;
    companyId: string;
    planAmount: string;
  }