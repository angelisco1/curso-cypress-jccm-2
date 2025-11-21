const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const usuariosValidos = [
  { email: 'cfalco@gmail.com', password: 'cfalco' },
];

app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/get-weather', (req, res, next) => {
  const weathers = ['soleado', 'parcialmente-nublado', 'nublado', 'lluvioso', 'tormenta', 'nevado'];
  const pos = Math.floor(Math.random() * weathers.length);
  const w = weathers[pos];

  res.json({ weather: w });
})


app.get('/get-city', (req, res, next) => {
  const { lat, lon } = req.query;
  console.log({ lat, lon })
  if (lat === '46.874396' && lon === '-96.835556') {
    return res.json({ ciudad: 'Fargo' });
  } else if (lat === '36.848044' && lon === '-83.320589') {
    console.log('Harlan')
    return res.json({ ciudad: 'Harlan' });
  } else if (lat === '52.485973' && lon === '-1.890715') {
    console.log('Birminghan')
    return res.json({ ciudad: 'Birmingham' });
  } else if (lat === '35.110816' && lon === '-106.668173') {
    return res.json({ ciudad: 'Albuquerque' });
  } else {
    console.log('Otra cidudad')
    return res.json({ ciudad: 'Una ciudad cualquiera...' });
  }
})


app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res, next) => {
  const params = req.body;
  const usuario = usuariosValidos.find(u => {
    return ((u.password === params.password) && (u.email === params.email));
  });
  if (usuario) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);
server.listen('8081');