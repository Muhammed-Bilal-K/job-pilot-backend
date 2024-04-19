import mongoose, { Document, Schema, Types, Model } from "mongoose";

interface ICompany extends Document {
  _id: string;
  companyname: string;
  email: string;
  companyType: string;
  location: string;
  logo: string;
  banner: string;
  rating: number;
}

const CompanySchema: Schema<ICompany> = new Schema<ICompany>({
  _id: { type  : String, required : true , unique : true},
  companyname: { type: String },
  email: { type: String },
  companyType: { type: String, default: "not mentioned" },
  location: { type: String, default: "not mentioned" },
  logo: { type: String, default: "" },
  banner: { type: String, default: "" },
});

const CompanyModel = mongoose.model<ICompany>("Company", CompanySchema);

export { ICompany, CompanyModel };
