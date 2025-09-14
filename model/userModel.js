const { Schema, default: mongoose } = require("mongoose");
const { encryptPassword } = require('../utilities/passwordEncrypt')

const userSchema = new Schema({
  username: { type: String,  unique: true, required: true },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: { type: String, required: true, minLength: 6, maxLength: 16 },
  phoneNumber: String,
  address: String,

   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // all new users are normal users
  },
});


// before password save database is not modified then next
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
// encrypt the password using bcrypt on the function encryptpassword
  this.password = await encryptPassword(this.password)
  next();
});

const userModel = mongoose.model("blogUsers", userSchema);
module.exports = userModel;
