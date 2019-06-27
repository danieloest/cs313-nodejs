const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', (req, res) => {
    console.log(req.query);
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);
    var operation = req.query.operation;
    var result = 0;
    switch(operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
          result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
          result = num1 / num2;
        break;
      default:
        console.log("Something went wrong");
    }
    // res.write(num1 + " " + operation + " " + num2 + " = " + result);
    res.render('pages/results.ejs', {results: result});
    // console.log(req.query()); 
    // res.end();
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
