import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods } from "../interfaces/users.interface";
import validator from "validator";
import bcrypt from "bcryptjs"

const addressSchema = new Schema<IAddress>({
  city: { type: String },
  street: { type: String },
  zip: { type: Number },
}, {
  _id: false
});

const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, "First name not given"],
      minlength: [5, "Minimum length 5. You gave {VALUE}"],
      maxlength: [10, "Maximum length 10, You gave {VALUE}"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [5, "Minimum length 5. You gave {VALUE}"],
      maxlength: [10, "Maximum length 10, You gave {VALUE}"],
    },
    email: {
      type: String,
      unique: [true, "The email: {VALUE} is already exist."],
      required: true,
      lowercase: true,
      trim: true,
      //   validate: {
      //     validator: function(v) {
      //       return /^\S+@\S+\.\S+$/.test(v);
      //     },
      //     message: props => `Email:${props.value} is not a valid email.`
      //   }
      validate: [validator.isEmail, "Invalid email: {VALUE}"],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role is not valid. Got {VALUE} is not valid",
      },
      default: "user",
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: addressSchema
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.method("hashPassword", async function(pass: string) {
  const password = await bcrypt.hash(pass, 10);
  this.password = password;
})

export const User = model("User", userSchema);
