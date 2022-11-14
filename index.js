const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
const url = "https://www.foxnews.com/";

const app = express();
app.use(cors);

app.get('/', (req, res) => {
  res.json('This is my web scraper')
})

app.get("/results", (req, res) => {
  axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    
    $(".title", html).each(function () {
      //<-- cannot be a function expression
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    // console.log(articles);
    res.json(articles);
  })
  .catch((err) => console.log(err));
})
  
app.listen(PORT, () =>
  console.log(`server running on PORT ${PORT}.  BOOM BABY!!!`)
);
