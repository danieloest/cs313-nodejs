const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('public/calculate.html'))
  .get('/calculate', (req, res) => {
    let weight = parseInt(req.query.weight);
    let mailType = req.query.mailType;
    let cost = calculateCost(weight, mailType);
    res.render('pages/results.ejs', {weight: weight, mailType: mailType, cost: cost});
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function calculateCost(weight, mailType) {
    if (mailType == 'stamped')
    {
      switch (true) {
        case (weight <= 1):
          return .55;
          break;
        case (weight <= 2):
          return .70;
          break;
        case (weight <= 3):
          return .85;
          break;
        case (weight <= 3.5):
          return 1;
          break;
      
        default:
          // What if it's over 3.5???
          break;
      }
    }
    if (mailType == 'metered')
    {
      switch (true) {
        case (weight <= 1):
          return .50;
          break;
        case (weight <= 2):
          return .65;
          break;
        case (weight <= 3):
          return .80;
          break;
        case (weight <= 3.5):
          return .95;
          break;
      
        default:
          // What if it's over 3.5???
          break;
      }
    }
    if (mailType == 'flats')
    {
      switch(true) {
        case (weight <= 1):
          return 1;
          break;
        case (weight <= 2):
          return 1.15;
          break;
        case (weight <= 3):
          return 1.30;
          break;
        case (weight <= 4):
          return 1.45;
          break;
        case (weight <= 5):
          return 1.60;
          break;
        case (weight <= 6):
          return 1.75;
          break;
        case (weight <= 7):
          return 1.90;
          break;
        case (weight <= 8):
          return 2.05;
          break;
        case (weight <= 9):
          return 2.20;
          break;
        case (weight <= 10):
          return 2.35;
          break;
        case (weight <= 11):
          return 2.50;
          break;
        case (weight <= 12):
          return 2.65;
          break;
        case (weight <= 13):
          return 2.80;
          break;
        default:
          // What if it's over 3.5???
          break;
      }
    }
    if (mailType == 'retail')
    {
      switch(true) {
        case (weight <= 4):
          return 3.66;
          break;
        case (weight <= 8):
          return 4.39;
          break;
        case (weight <= 12):
          return 5.19;
          break;
        case (weight >= 13):
          return 5.71;
          break;
        default:
          // What if it's over 3.5???
          break;
      }
    }
  }