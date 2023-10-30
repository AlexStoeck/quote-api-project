const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, (req, res, next) => {
  console.log(`This server listens to Port: ${PORT}`);
});

//get random quote
app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = {
        quote: getRandomElement(quotes)
    }
    res.send(randomQuote);
});

//get all quotes and quote by author
app.get('/api/quotes', (req, res, next) => {
  const quoteAuthor = req.query.person;
  const bundleQuote = [];

  if (!quoteAuthor) {
    res.send({ quotes: quotes });
  } else {
    quotes.forEach(quote => {
      if (quote.author === quoteAuthor) {
        bundleQuote.push(quote);
      }
      res.send(bundleQuote);
    });
  }
});



// add own quote
app.post('/api/quotes', (req, res, next) => {
  const quote = req.query.quote;
  const author = req.query.person;
    
    if(quote && author) {
        let newQuote = {
            quote: quote,
            author: author
        };
        quotes.push(newQuote);
        res.status(204).send( {quote: newQuote });
    } else {
        res.status(400).send("You must add a valid quote or person.");
    }
});
