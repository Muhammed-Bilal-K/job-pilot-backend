import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  _id?: string;
  companyId?: any;
  name: string;
  logo: string;
  banner: string;
  about: string;
  organizationType: string;
  industryType: string;
  teamSize: string;
  yearEstablished: string;
  website: string;
  country: string;
  state: string;
  vision: string;
  socialLinks1: string;
  socialLinks2: string;
  phone: string;
}

const CompanySchema: Schema<ICompany> = new Schema<ICompany>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true
    },
    name: { type: String  },
    logo: { type: String, default: "" },
    banner: { type: String, default: "" },
    about: { type: String, default: "" },
    organizationType: { type: String, default: "" },
    industryType: { type: String, default: "" },
    teamSize: { type: String, default: "" },
    yearEstablished: { type: String, default: "" },
    website: { type: String, default: "" },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    vision: { type: String, default: "" },
    socialLinks1: { type: String, default: "" },
    socialLinks2: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model<ICompany>("Company", CompanySchema);

export default CompanyModel;
