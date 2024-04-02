import ApplicationStatus from '../../entities/application';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface IApplication extends Document {
  user: mongoose.Types.ObjectId; 
  job: mongoose.Types.ObjectId; 
  status: ApplicationStatus; 
  viewed: boolean; 
  shortlisted: boolean; 
  resumeURL: string;
  coverLetter: string;
}

const ApplicationSchema: Schema<IApplication> = new Schema<IApplication>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, 
    status: { type: String, enum: Object.values(ApplicationStatus), default: ApplicationStatus.PENDING },
    viewed: { type: Boolean, default: false },
    shortlisted: { type: Boolean, default: false },
    resumeURL: { type: String }, 
    coverLetter: { type: String , default : '' } 
  },
  {
    timestamps: true,
  }
);

const ApplicationModel: Model<IApplication> = mongoose.model<IApplication>('Application', ApplicationSchema);

export { ApplicationModel, ApplicationStatus };
