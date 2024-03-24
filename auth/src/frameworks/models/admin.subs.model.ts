import mongoose, { Document, Model, Schema } from "mongoose";

interface IPlan extends Document {
  type: string
  name: string;
  description: string;
  amount: number;
  features: string[];
}

const PlanSchema: Schema<IPlan> = new Schema<IPlan>({
  type : { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  features: [{ type: String }],
},{
  timestamps: true,
});

const PlanModel: Model<IPlan> = mongoose.model<IPlan>("Plan", PlanSchema);

export default PlanModel;
