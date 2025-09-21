const moment = require("moment");
const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema(
  {
    title: { type: String, required: false },
    body: {
      type: String,
      required: [false, "Please provide note details"],
    },
    done: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogUsers",
      required: true,
    },
    formattedDate: {
      type: String,
    },
  },
  { timestamps: true }
);
// ✨ Pre-save hook: blog.save() এর আগে formattedDate সেট হবে
blogSchema.pre("save", function (next) {
  if (this.updatedAt) {
    this.formattedDate = moment(this.updatedAt).format("DD-MM-YYYY");
  }
  next();
});

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;
