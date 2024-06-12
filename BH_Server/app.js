const express = require("express");
const token = require("./routes/token");
const cors = require("cors");
const mongodb = require("mongodb");
const TokenDAO = require("./DAO/token");
const app = express();
const MongoClient = mongodb.MongoClient;

app.use(cors());
app.use(express.json());

// app.use('/', (req, res)=>{
//     console.log(req.params)
// })
const mongo_username = process.env.REACT_APP_MONGO_USERNAME;
const mongo_password = process.env.REACT_APP_MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@bankhub.bfipzym.mongodb.net/?retryWrites=true&w=majority&appName=BankHub`;

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  // useNewUrlParser: true,
})
  .catch((e) => {
    console.log(e.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await TokenDAO.injectDB(client)
      .then((reponse) => {
        console.log("Connect to database successfully");
      })
      .catch((e) => {
        console.log(e);
      });
    app.use("/api/v1/token", token);
    app.listen(8000, () => {
      console.log("Listening...");
    });
  });
