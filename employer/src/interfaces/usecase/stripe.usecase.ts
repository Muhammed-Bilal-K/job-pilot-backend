
interface IStripeUsecase {
    createPlans(data: any): Promise<any>;
  }
  
  export default IStripeUsecase;