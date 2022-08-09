require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const { URLSearchParams } = require('url');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, './client/build')));

const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;
const CLIENT_SECRET = process.env.CLIENT_SECRET
const scope = 'user-read-private'
const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI
  }).toString();

app.get('/', (req, res) => {
  res.send('Hello World! :)');
  console.log(CLIENT_SECRET)
});

app.get('/login', (req, res) => {
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

console.log('http://localhost:8888/login')

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': REDIRECT_URI
    }).toString(),
    headers: { 
      'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token , refresh_token, expires_in } = response.data;
        const queryParams = new URLSearchParams({
          access_token,
          refresh_token,
          expires_in
        }).toString();
        res.redirect(`http://${FRONTEND_URI}/?${queryParams}`);
      } else {
        res.send('Something broke somewhere...');
      }
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      'refresh_token': refresh_token
    }).toString(),
    headers: { 
      'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
  })
    .then((response) => {
        res.send(response.data);
      }) 
    .catch(error => {
      res.send(error);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`)
});