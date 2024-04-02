import mongoose, { Document, Schema,Types } from 'mongoose';

interface IAuth extends Document {
  _id?: string;
  name:string;
  username: string;
  email: string;
  role:string,
  stripeCustomerId:String,
}

const AuthSchema: Schema<IAuth> = new Schema<IAuth>({
  _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId()},
  name: 
  { type: String,
     required: true 
    },
  username: 
  { type: String,
     required: true 
    },
  email: { 
    type: String, 
    unique:true,
    required: true 
    },
  role: {
    type:String,
    default:'employer'
  },
  stripeCustomerId: {
    type: String,
    default: 'None'
  },
},{
    timestamps: true,
  });

const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);

export default AuthModel;
