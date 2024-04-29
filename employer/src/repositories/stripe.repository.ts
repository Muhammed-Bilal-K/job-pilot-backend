import Stripe from "stripe";
import { IPlan } from "../interfaces/employer.interface";
import AuthModel from '../frameworks/models/auth.model';
import moment from 'moment-timezone';

require('dotenv').config();

class StripeRepository {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  async createPlan(plan: IPlan, price: string , companyId : string) {
    const lineItems = [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: plan.name,
          },
          unit_amount: parseInt(price) * 100,
        },
        quantity: 1, 
      }
    ];

    try {
      const session = await this.stripe.checkout.sessions.create(
        {
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: "http://localhost:5173/employer/emplo-dash",
          cancel_url: "http://localhost:5173/employer/emplo-dash/post_job",
          client_reference_id: companyId
        }
      );

      await this.updateStripeCustomerId(companyId, session.id , plan._id);

      return session;
    } catch (err) {
      throw err;
    }
  }

  async updateStripeCustomerId(companyId: string, stripeId: string , planId : string) {
    const currentDateIndia = moment().tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss.SSS');
    try {
      await AuthModel.findByIdAndUpdate(companyId, { stripeCustomerId: stripeId , stripePurchaseDate : currentDateIndia , planId : planId});
    } catch (err) {
      throw err;
    }
  }
}

export default StripeRepository;
