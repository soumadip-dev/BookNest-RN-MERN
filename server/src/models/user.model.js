import mongoose from 'mongoose';

//* Schema definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

//* Create the model
const User = mongoose.model.User || mongoose.model('User', userSchema);

//* Export the model
export default User;
