var express = require('express');
var router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index.hbs');

});

router.get('/artist-search', (req, res, next) => {
  
  spotifyApi
  .searchArtists(req.query.artist)
  .then(data => {
    console.log('The received data from the API: ', data.body.artists);
    const results = data.body.artists
    res.render('artist-search-results.hbs', results)
    // ----> 'HERE'S WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

})

router.get("/albums/:artistId", (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.artistId)
  .then((data) => {
    console.log('Artist albums', data.body.items[0]);
    const result = data.body
    res.render('artist-albums.hbs', result)
  })
  .catch((err) => {
    console.error(err);
  });
})

router.get("/tracks/:id", ((req, res, next) => {
  spotifyApi.getAlbumTracks(req.params.id)
  .then((data) => {
    console.log(data.body)
    const result = data.body
    res.render("tracks.hbs", result);
  })
  .catch((err) => {
    console.log(err)
  })
}))

module.exports = router;
