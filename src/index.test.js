const req = require("supertest");
const jwt = require("jsonwebtoken");
const User = require("./api/user/user.model");
const FavList = require("./api/fav-list/models/fav-list.model");
const mongoose = require("mongoose");
const { disconnectDB, connectDB, cleanupDB } = require("./config/database");
const { app } = require("./index");

const userId = mongoose.Types.ObjectId();
const favListId = mongoose.Types.ObjectId();
const user = {
  userId,
  email: "rdfadmin@gmail.com",
  password: "12345!",
  token: jwt.sign(
    { userId, email: "rdfadmin@gmail.com" },
    process.env.TOKEN_KEY
  ),
};

describe("user", () => {
  beforeAll(async () => {
    await connectDB();
    await cleanupDB();

    const defaultUser = new User(user);
    await defaultUser.save();
    const favList = new FavList({
      _id: favListId,
      name: "Test Fav",
      favs: [
        {
          title: "Fav 3",
          description: "Description fav 3",
          link: "https://safe5.com",
        },
      ],
    });
    await favList.save();
  });
  afterAll(async () => {
    await cleanupDB();
    await disconnectDB();
  });
  it("should log in user", async () => {
    const res = await req(app)
      .post("/auth/local/login")
      .send({ email: "rdfadmin@gmail.com", password: "12345!" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBe(null);
  });
  it("should get fav lists", async () => {
    const res = await req(app)
      .get("/api/favs")
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.statusCode).toBe(200);
  });
  it("should get fav list by id", async () => {
    const res = await req(app)
      .get(`/api/favs/${favListId.toString()}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBe(null);
  });
  it("should create fav list", async () => {
    const favList = {
      name: "Fav List 3",
      favs: [
        {
          title: "Fav 5",
          description: "Description fav 5",
          link: "https://safe5.com",
        },
      ],
    };
    const res = await req(app)
      .post("/api/favs")
      .set("Authorization", `Bearer ${user.token}`)
      .send(favList);
    expect(res.statusCode).toBe(201);
    expect(res.body).not.toBe(null);
  });
  it("should delete fav list by id", async () => {
    const res = await req(app)
      .delete(`/api/favs/${favListId.toString()}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.statusCode).toBe(200);
  });
});
