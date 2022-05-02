const mongoose = require("mongoose");
const { FavSchema } = require("./fav.model");

const FavListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    favs: {
      type: [FavSchema],
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Empty list not allowed.",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FavList", FavListSchema);
