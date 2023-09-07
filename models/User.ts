import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  province: string;
  city: string;
  isAdmin: boolean;
  photo: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compareSync(password, user.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
