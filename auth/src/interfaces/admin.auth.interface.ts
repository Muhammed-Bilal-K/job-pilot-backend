export interface IAdminLoginRequest {
  email: string;
  password: string;
}

export interface ICreateSubscriptionRequest {
  name: string;
  description: string;
  amount: string;
  features: string[];
}

