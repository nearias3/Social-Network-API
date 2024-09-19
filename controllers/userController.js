const User = require("../models/User");
const Thought = require("../models/Thought");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends");

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    // Remove associated thoughts
    await Thought.deleteMany({ username: user.username });

    res.json({ message: "User and associated thoughts deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a friend to a user's friend list
const addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }, // Ensures no duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a friend from a user's friend list
const removeFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }, // Removes the friend
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user found with that ID" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
