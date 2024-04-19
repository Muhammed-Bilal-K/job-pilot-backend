import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IConversation extends Document {
  members: string[];
  latestMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    members: [
      { type: Types.ObjectId, ref: 'User' }
    ],
    latestMessage:{type:String , default : ''}
  },
  { timestamps: true }
);

const Conversation: Model<IConversation> = mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);

export default Conversation;
