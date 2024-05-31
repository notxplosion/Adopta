
const express = require('express');
const path = require('path');
const port = 5000;
const app = express();

app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
const flash = require('connect-flash');
const fs = require('fs');
const login = path.join(__dirname, "data", 'login.txt');
const petsInfo = path.join(__dirname, "data", 'petsInfo.txt');

app.use(flash());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/home", (req, res) => {
  res.render("home") ,  { message: req.flash('message') }
});

app.get("/catcare", (req, res) => {
  res.render("catcare");
});

app.get("/dogcare", (req, res) => {
  res.render("dogcare");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/find", (req, res) => {
  res.render("find");
});

app.get("/petgiveaway", loginRequired, (req, res) => {
  res.render("petgiveaway");
});

app.get("/pets", (req, res) => {
  res.render("pets");
});

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/account", (req, res) => {
  res.render("account");
});

app.post('/accountCreate', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (usernameExists(username)) {
    res.send('Username already exists');
  } else if (!usernameValid(username)) {
    res.send('Invalid username');
  } else if (!passwordValid(password)) {
    res.send('Invalid password');
  } else {
    fs.appendFileSync(login, `${username}:${password}\n`);
    res.send('Account created');
  }
});

function usernameExists(username) {
  const data = fs.readFileSync(login, 'utf8');
  const users = data.split('\n');
  for (let i = 0; i < users.length; i++) {
    const user = users[i].split(':');
    if (user[0] === username) {
      return true;
    }
  }
  return false;
}

function usernameValid(username) {
  return username.match(/^[a-zA-Z0-9]+$/);
}

function passwordValid(password) {
  return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/);
}

function loginRequired(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

function loginValid(username, password) {
  const data = fs.readFileSync(login, 'utf8');
  const users = data.split('\n');
  for (let i = 0; i < users.length; i++) {
    const user = users[i].split(':');
    if (user[0] === username && user[1] === password) {
      return true;
    }
  }
  return false;
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (loginValid(username, password)) {
    req.session.user = username;
    res.redirect("/petgiveaway");
  } else {
    res.send("Invalid username or password. Please try again.");
  }
});

app.post("findingPets", (req, res) => {
  const {
    pet,
    dog,
    cat,
    breedDog,
    breedCat,
    age,
  } = req.body;
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("Session destroyed.")
    }
    res.redirect("/home");
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});






