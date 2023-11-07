import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validator: {
        validate: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    firstname: {
      type: String,
      minlength: 3,
    },
    lastname: {
      type: String,
      minlength: 3,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);

User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const authSchema = mongoose.models.authUser || mongoose.model("authUser", User);

export { authSchema };
