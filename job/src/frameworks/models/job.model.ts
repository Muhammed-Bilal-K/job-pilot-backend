import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
  company :any
  jobTitle: string;
  tags: string;
  jobRole: string;
  minSalary: string;
  maxSalary: string;
  education: string;
  experience: string;
  jobtype: string;
  expiredate: string;
  joblevel: string;
  applicationNo: string;
  country: string;
  state: string;
  jobDescription: string;
  companylogo: string;
}

const JobSchema: Schema<IJob> = new Schema<IJob>(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    jobTitle: { type: String, required: true },
    tags: { type: String, required: true },
    jobRole: { type: String, required: true },
    minSalary: { type: String, required: true },
    maxSalary: { type: String, required: true },
    education: { type: String, required: true },
    experience: { type: String, required: true },
    jobtype: { type: String, required: true },
    expiredate: { type: String, required: true },
    joblevel: { type: String, required: true },
    applicationNo: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    jobDescription: { type: String, required: true },
    companylogo : { 
      type : String,
      default : "https://ferdykorpwp.com/wp-content/uploads/2020/12/LogoSoftware.jpg",
    } ,
  },
  {
    timestamps: true,
  }
);

const JobModel: Model<IJob> = mongoose.model<IJob>("Job", JobSchema);

export default JobModel;
