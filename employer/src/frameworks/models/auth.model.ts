import mongoose, { Document, Schema } from "mongoose";

interface IAuth extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  stripeCustomerId: string;
  stripePurchaseDate : Date;
}

const AuthSchema: Schema<IAuth> = new Schema<IAuth>(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "employer" },
    stripeCustomerId: { type: String, default: "None" },
    stripePurchaseDate : { type : Date , default : new Date }
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);

export default AuthModel;
