import mongoose, { Document, Schema, Types } from 'mongoose';

interface IUser extends Document {
  _id?: string;
  userId?: Types.ObjectId;
  name: string;
  address: string;
  phonenumber: number;
  photo: string;
  profilesummary: string;
  education: string;
  experience: string;
  email: string;
  resume:string;
  websiteurl: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    photo: { type:String, default: '' },
    profilesummary: { type: String, default: '' },
    education: { type: String, default: '' },
    experience: { type: String, default: '' },
    email: { type: String, default: '' },
    websiteurl: { type: String, default: '' },
    resume:{ type: String, default: '' },
    phonenumber: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { IUser, UserModel };
