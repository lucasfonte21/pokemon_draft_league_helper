const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a league name'],
    trim: true,
    maxlength: 50
  },
  commissioner: {
    // This strictly links to a specific User's ID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  format: {
    type: String,
    required: [true, 'Please specify the league format (e.g., Paldea Dex, Nat Dex, VGC)'],
    default: 'Standard Draft'
  },
  players: [{
    // This is an array of User IDs, completing our two-way street!
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true // Automatically tracks when the league was created
});

module.exports = mongoose.model('League', leagueSchema);