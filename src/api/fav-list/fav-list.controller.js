const FavList = require("./models/fav-list.model");

async function createFavList(req, res) {
  const data = req.body;
  const payload = { ...data };
  try {
    const favList = await FavList.create(payload);
    res.status(201).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllFavLists(req, res) {
  try {
    const allFavs = await FavList.find();
    res.status(200).json(allFavs);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteFavList(req, res) {
  const { id } = req.params;
  try {
    const favList = await FavList.findByIdAndDelete(id);
    res.status(200).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getFavList(req, res) {
  const { id } = req.params;
  try {
    const favList = await FavList.findById(id);
    res.status(200).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function createFav(req, res) {
  const { id } = req.params;
  const data = req.body;
  const payload = { ...data };
  try {
    const favList = await FavList.findByIdAndUpdate(
      id,
      {
        $push: {
          favs: payload,
        },
      },
      { new: true }
    );
    res.status(200).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createFavList,
  getAllFavLists,
  deleteFavList,
  getFavList,
  createFav,
};
