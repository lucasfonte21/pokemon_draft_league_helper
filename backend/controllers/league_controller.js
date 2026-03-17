const League = require('../models/League');
const User = require('../models/User');

// @desc    Create a new Draft League
// @route   POST /api/leagues
// @access  Private (Requires Token)
const createLeague = async (req, res) => {
  try {
    const { name, format } = req.body;

    // 1. Make sure they actually typed a name
    if (!name) {
      return res.status(400).json({ message: 'Please provide a league name' });
    }

    // 2. Create the new league in the database
    const league = await League.create({
      name,
      format,
      commissioner: req.user.id, // We get this from the 'protect' middleware!
      players: [req.user.id] // The commissioner is automatically Player 1
    });

    // 3. The Two-Way Street: Add this new league's ID to the User's profile
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { leagues: league._id } },
      { new: true } // Tells Mongoose to return the updated user document
    );

    // 4. Send the successful league data back to the frontend
    res.status(201).json(league);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating league' });
  }
};

const getUserLeagues = async (req, res) => {
  try {
    // Find all leagues where this user's ID is in the 'players' array
    const leagues = await League.find({ players: req.user.id })
      .populate('commissioner', 'username email') // Swaps the commissioner ID for their actual name/email!
      .sort({ createdAt: -1 }); // Sorts the results so the newest leagues show up first

    res.status(200).json(leagues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching leagues' });
  }
};

const getLeagueById = async (req, res) => {
  try {
    // req.params.id grabs the ID straight out of the URL
    const league = await League.findById(req.params.id)
      .populate('commissioner', 'username email') 
      .populate('players', 'username'); // Swaps all player IDs for their actual usernames!

    // If someone types a fake ID into the URL, handle it gracefully
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }

    res.status(200).json(league);
  } catch (error) {
    console.error(error);
    // If the ID isn't a valid MongoDB format, it will throw an error. We catch that here.
    res.status(500).json({ message: 'Server error while fetching league' });
  }
};


module.exports = { createLeague, getUserLeagues, getLeagueById };