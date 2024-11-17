const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: (arr) => arr.length <= 10,
        message: "Cannot exceed 10 images",
      },
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (tags) => tags.length > 0, 
        message: "At least one tag is required",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
