export interface IRegisterRequest {
  fullname: string;
  username: string;
  email: string;
  role: string;
  password: string;
  confirmpassword?: string;
  isBlock?: boolean;
}

export interface IJobCreateRequest {
  jobTitle: string;
  tags: string;
  jobRole: string;
  maxSalary: string;
  minSalary: string;
  education: string;
  experience: string;
  jobtype: string;
  expiredate: string;
  joblevel: string;
  applicationNo: string;
  country: string;
  state: string;
  jobDescription: string;
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

export interface ICompany {
  companyId: string;
  planAmount: string;
}

export interface IPlanData {
  plan: IPlan;
  companyId: string;
  planAmount: string;
}
