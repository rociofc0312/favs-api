const { Router } = require("express");
const { loginUser, createUser } = require("./user.controller");

const router = Router();

// CRUD
router.post("/local/login", loginUser);
router.post("/local/register", createUser);

module.exports = router;
