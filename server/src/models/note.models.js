import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
        type:String
    },
    content:{
        type:String
    }
  },
  { timestamps: true }
);

noteSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.trim();
  }
  if (this.content) {
    this.content = this.content.trim();
  }
  next();
});

noteSchema.methods.getSummary = function () {
  return this.content?.length > 100 ? this.content.slice(0, 100) + '...' : this.content;
};

export const Notes = mongoose.model("Notes", noteSchema);
