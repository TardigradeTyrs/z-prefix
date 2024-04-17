const express = require("express");
const app = express();
const port = process.env.port || 8080;
const cors = require("cors");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/inventory", (req, res) => {
  knex("item")
    .select("*")
    .then((items) => {
      res.status(200).json(items);
    });
});

app.post("/inventory", (req, res) => {
  const { UserId, Item_Name, Description, Quantity } = req.body;
  knex("item")
    .insert({
      UserId: UserId,
      Item_Name: Item_Name,
      Description: Description,
      Quantity: Quantity,
    })
    .then(res.status(201).send("Item Added!"));
});

app.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  const hashed = await knex("users")
    .select("hashed")
    .where({ Username: Username });
  console.log(Username, Password, hashed);
  bcrypt.compare(Password, hashed[0].hashed).then(async (ret) => {
    if (ret === true) {
      const user = await knex("users")
        .select("UserId")
        .where({ Username: Username });
      res.status(200).json(user);
    } else {
      res.status(404).send("incorrect username or password");
    }
  });
});

app.post("/createAccount", async (req, res) => {
  const { First_Name, Last_Name, Username, Password } = req.body;
  const hash = bcrypt.hashSync(Password, saltRounds);
  knex("users")
    .insert({
      First_Name: First_Name,
      Last_Name: Last_Name,
      Username: Username,
      hashed: hash,
    })
    .then(res.status(201).send("Account Created!"));
});

app.put("/inventory", (req, res) => {
  const { Id, Item_Name, Description, Quantity } = req.body;
  console.log(Id, Item_Name)
  knex("item")
    .where("Id", Id)
    .update({
      Item_Name: Item_Name,
      Description: Description,
      Quantity: Quantity,
    })
    .then(res.status(202).send("item updated"));
});

app.delete("/inventory", (req, res) => {
  const { Id } = req.body;
  knex("item")
    .select("*")
    .where("Id", Id)
    .delete()
    .then(res.status(202).send(`${Id} Deleted`));
});

app.listen(port, () => {
  console.log("It is running");
});
