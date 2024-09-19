const Thought = require("../models/Thought");
const User = require("../models/User");

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by ID
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought and push its ID to the associated user's thoughts array
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the new thought's ID to the associated user's thoughts array
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "Thought created, but no user found with that ID" });
    }

    res.json({ message: "Thought successfully created!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought and remove it from the user's thoughts array
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    // Remove the thought's ID from the associated user's thoughts array
    await User.findOneAndUpdate(
      { _id: thought.userId },
      { $pull: { thoughts: req.params.thoughtId } }
    );

    res.json({ message: "Thought and associated reactions deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Remove a reaction from a thought by its reactionId
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};