import mongoose, { Document, Schema, Types } from "mongoose";

interface IAuth extends Document {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  favoriteJobs: string[];
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
    favoriteJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    role: {
      type: String,
      default: "candidate",
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);

export default AuthModel;
