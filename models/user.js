const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['Standard', 'ProjectManager', 'TeamLead', 'QA', 'Observer', 'Admin'], // Define roles here
      default: 'Standard',
      required: true, // Ensure role is required
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Hash password before saving to database
userSchema.pre('save', function (next) {
  const user = this;

  // Only hash the password if it is modified or new
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash; // Save the hashed password
    next();
  });
});

// Method to compare entered password with hashed password in database
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare passwords securely
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
