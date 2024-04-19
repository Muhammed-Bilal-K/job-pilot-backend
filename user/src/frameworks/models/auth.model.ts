import mongoose, { Document, Schema, Types } from "mongoose";

interface IAuth extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  address: string;
  experienceLevel?: string;
  educations?: string;
  linkedinUrl?: string;
  biography?: string;
  phoneNumber?: string;
  userlogo: string;
  preferredJob : string;
  resumeUrl : string;
}

const AuthSchema: Schema<IAuth> = new Schema<IAuth>(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: "candidate",
    },
    address: { type: String, default: "" },
    experienceLevel: { type: String, default: "" },
    educations: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    biography: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    userlogo: { type: String, default: "" },
    preferredJob : { type: String, default: "" },
    resumeUrl : { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);

export default AuthModel;
