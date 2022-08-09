require('dotenv').config();
const axios = require('axios');
const querystring = require('querystring');
const express = require('express');
const { URLSearchParams } = require('url');
const app = express();
const port = 8888;


app.get('/', (req, res) => {
  res.send('Hello World! :)');
  console.log(CLIENT_SECRET)
});

app.listen(port, () => {
});

const client_secret = process.env.CLIENT_SECRET
const scope = 'user-read-private'
const client_id = process.env.CLIENT_ID
const redirect_uri = process.env.REDIRECT_URI
const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri
  }).toString();


app.get('/login', (req, res) => {
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

console.log('http://localhost:8888/login')

// app.get('/callback', (req, res) => {
//   const code = req.query.code
//   console.log(code)
//   const data = new URLSearchParams({
//     "code": code,
//     "redirect_uri": redirect_uri,
//     "grant_type": "authorization_code"
//   }).toString();
//   const config = {
//     headers: {
//     "Authorization": `Basic ${new Buffer.from(`{$CLIENT_ID}:${client_secret}`).toString('base64')}`,
//     "content-type": "application/x-www-form-urlencoded"
//     }
//   };
//   console.log(data)

  app.get('/callback', (req, res) => {
    const code = req.query.code || null;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri
      }).toString(),
      headers: { 
        'Authorization': `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
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
          res.redirect(`http://localhost:3000/?${queryParams}`);
        } else {
          res.send('Something broke somewhere...');
        }
      })
      .catch(error => {
        res.send(error);
      });
  });

  // app.get('/refresh_token', (req, res) => {
  //   const { refresh_token } = req.query;
  
  //   axios({
  //     method: 'post',
  //     url: 'https://accounts.spotify.com/api/token',
  //     data: querystring.stringify({
  //       grant_type: 'refresh_token',
  //       refresh_token: refresh_token
  //     }),
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
  //     },
  //   })
  //     .then(response => {
  //       res.send(response.data);
  //     })
  //     .catch(error => {
  //       res.send(error);
  //     });
  // });


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
        'Authorization': `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
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

  // const apiCall = axios.post('https://accounts.spotify.com/api/token', data, config)
  // .then((response) => {
  //   if (response.status === 200) {
  //     console.log(response.parse(data));
  //     console.log(response.status)
  //   } else {
  //     res.send("Didn't work");
  //   }
  // })
  // .catch(error => {
  //   res.send(error);
  // });
// });

// http://localhost:3000/login