const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true, // Removes accidental spaces before/after the name
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true // Forces all emails to lowercase so "John@test.com" matches "john@test.com"
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  leagues: [{
    type : mongoose.Schema.ObjectId,
    ref: 'League'
  }]
}, {
  timestamps: true // Automatically adds "createdAt" and "updatedAt" to every user
});

userSchema.pre('save', async function(next) {
// If the password hasn't been changed (like if they are just updating their username), skip this
  if (!this.isModified('password')) {
    next();
}

// Generate a "salt" (random data added to the password to make the hash totally unique)
const salt = await bcrypt.genSalt(10);

// Replace the plain text password with the hashed password
this.password = await bcrypt.hash(this.password, salt);
});

// A helper method we will use later to check passwords when a user logs in
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);