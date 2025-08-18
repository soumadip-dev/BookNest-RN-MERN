import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

//* Pre save hook to hash the password and convert email to lowercase
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.email = this.email.toLowerCase();
  next();
});

//* Compare password method
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//* Create the model
const User = mongoose.model.User || mongoose.model('User', userSchema);

//* Export the model
export default User;
