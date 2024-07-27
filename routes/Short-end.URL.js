const express = require("express");
const Router = express.Router();
const User = require("../module&schema/module.schema");

// localhost:3003/url/shorturl/:email
Router.post("/shorturl/:email", async (req, res) => {
  const { email } = req.params;
  const { url } = req.body;
  try {
    const user = await User.find({ email });
    if (!user.length)
      return res.json({ message: "Kindly Login to Short-End the URL" });
    const shortURL = "https://login-page-url-shortend-react.onrender.com/url/short/<email>";
    await User.updateOne({ email }, { $push: { url, shortURL: shortURL } });
    res.json({
      message:
        "Replace <email> from your actual login email to navigate your given URL",
      email,
      shortURL,
      user,
    });
  } catch (err) {
    console.log(err.message);
  }
});

// localhost:3003/url/getuser/:email
Router.get("/getuser/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.find({ email });
    if (!user.length)
      return res.json({ message: "No Date Found Right Now!..." });
    res.json({ user });
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
});

Router.get("/short/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.find({ email });
    console.log(user);
    if (!user.length)
      return res.json({ message: "Kindly login to generate short URL" });
    res.redirect(user[0].url[user[0].url.length - 1]);
  } catch (err) {
    console.log(err.message);
  }
  res.json({
    message: "welcome to shortend url",
  });
});

// localhost:3003/url/allurl
Router.get("/allurl", async (req, res) => {
  try {
    const user = await User.find();
    if (!user.length) return res.json({ message: "No Records Found" });
    let users = user.map((val) => {
      return val.shortURL;
    });
    let arr = [];
    for (let i = 0; i < users.length; i++) {
      if (i < users.length - 1) {
        arr = [...users[i], ...users[i + 1]];
      }
    }
    res.json({
      user: arr,
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = Router;
