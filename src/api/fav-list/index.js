const { Router } = require("express");
const {
  createFavList,
  getAllFavLists,
  getFavList,
  deleteFavList,
  createFav,
} = require("./fav-list.controller");
const { isAuthenticated } = require("../../auth/auth.service");
const router = Router();

// CRUD
router.post("/", isAuthenticated(), createFavList);
router.get("/", isAuthenticated(), getAllFavLists);
router.get("/:id", isAuthenticated(), getFavList);
router.delete("/:id", isAuthenticated(), deleteFavList);
router.post("/:id/add-fav", isAuthenticated(), createFav);

module.exports = router;
