import { IPlanData } from "../interfaces/employer.interface";
import StripeRepository from "../repositories/stripe.repository";


class StripeUsecase{
    private stripe:StripeRepository

    constructor(stripe:StripeRepository){
        this.stripe=stripe;
    }

    async createPlans(data : IPlanData){
        try{
           const payment = this.stripe.createPlan(data.plan , data.planAmount);
           return (await payment).url;
        }catch(err){
            throw err
        }
    }

}

export default StripeUsecase