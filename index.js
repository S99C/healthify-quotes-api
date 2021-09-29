const fs = require("fs");
const express = require("express");
const app = express();
// const PORT = 8080;

app.use(express.json());

let quotes_json = require("./quotes.json");

if (!(quotes_json.hasOwnProperty("custom_quotes"))){
    quotes_json["custom_quotes"] = [];
}

// console.log(quotes_json)

function getRamdomQuotes() {
  len_of_quotes = quotes_json["quotes"].length;
  random_number = Math.floor(Math.random() * len_of_quotes);
  return quotes_json["quotes"][random_number];
}

function postewQuotes(quote, author) {
  quotes_json["custom_quotes"].push({ quote: quote, author: author });
  console.log(quotes_json["custom_quotes"]);
  fs.writeFile("quotes.json", JSON.stringify(quotes_json), function (err) {
    if (err) throw err;
    console.log("complete");
  });
}

// get random quote api
app.get("/get-random-quote", (req, res) => {
  res.status(200).send(getRamdomQuotes());
});

// post random quote api
app.post("/post-new-quote", (req, res) => {
  const xc = req.body.quote;
  const xv = req.body.author;
  postewQuotes(xc, xv);
  res.status(200).send(quotes_json["custom_quotes"]);
});

// get all custom added quotes
app.get("/get-all-custom-quotes", (req, res) => {
  res.status(200).send(quotes_json["custom_quotes"]);
});

// app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`));
app.listen(process.env.PORT || 5000);
