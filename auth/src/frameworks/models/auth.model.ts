import mongoose, { Document, Model, Schema } from "mongoose";

interface IAuth extends Document {
  _id?: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isBlock: boolean;
  isVerify: number;
}

const AuthSchema: Schema<IAuth> = new Schema<IAuth>(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    role: { type: String, default: "employer" },
    isBlock: { type: Boolean, default: false },
    isVerify: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const AuthModel: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema);

export default AuthModel;
