const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/get', (req, res) => {
  res.send('get');
});

app.post('/set', (req, res) => {
  res.send('Сохранение прошло успешно');
  let tariffList = [];
  for (let tariff of req.body.tariffList) {
    let tariffServices = [];
    for (let service of req.body.serviceList) {
      if (tariff.serviceIds.indexOf(service.id) >= 0) {
        tariffServices.push(service.name);
      }
    }
    tariffList.push({
      id: tariff.id,
      name: tariff.name,
      price: tariff.price,
      services: tariffServices.join(",")
    });
  }  
  let data = {
    serviceList: req.body.serviceList,
    tariffList: tariffList
  };
  fs.writeFileSync('./post_data.json', JSON.stringify(data));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
