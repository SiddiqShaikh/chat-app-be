import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  lastMessage: {
    type: String,
  },
  lastMessageTime: {
    type: Date,
  },
});

export const Messages = mongoose.model("Conversation", ConversationSchema);
