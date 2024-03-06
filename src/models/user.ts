import { Schema, model } from "mongoose";
import { UserDocument } from "../types/user.interface";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = new Schema<UserDocument>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    birthDate: {
      type: String,
      required: [true, "Birth Date is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "invalid email"],
      createIndexes: { unique: true },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

userSchema.methods.validatePassword = function (password: string) {
  console.log("validatePassword", password, this);
  return bcryptjs.compare(password, this.password);
};

export default model<UserDocument>("User", userSchema);
