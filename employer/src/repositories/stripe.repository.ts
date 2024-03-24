import Stripe from "stripe";
import { IPlan } from "../interfaces/employer.interface";

require('dotenv').config();

class StripeRepository {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  async createPlan(plan: IPlan, price: string) {
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
        }
      );
      return session;
    } catch (err) {
      throw err;
    }
  }
}

export default StripeRepository;
