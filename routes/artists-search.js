const { query } = require('express');
var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

/* GET home page. */
router.get('/', function(req, res, next) {
   const query = req.query.query;
    spotifyApi
  .searchArtists(query)
  .then(data => {
    // console.log('The received data from the API: ',{ artist: data.body.artists.items});
        
    res.render('artist-search-result', { artist: data.body.artists.items});
    
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
});

router.get('/albums/:artistId', (req, res, next) =>{
  
})

module.exports = router;
