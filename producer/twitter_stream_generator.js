const Twit = require('twit')
const T = new Twit({
  consumer_key:         'E5WZtaPOXzi7l49jX8AXBVLIe',
  consumer_secret:      'I7Z56kDOhWectMSogV7VIW9qCw8NcDoY3L3MLyI2AE0MWyamwx',
  access_token:         '1032587864725495808-J1D5Ql9iyb3a7dgr6wPeyqLdV63mMB',
  access_token_secret:  'Nz2O8sGyWbbVtaKUB1ROoRmUu8ddnshIx9eMUE3jidioZ',
  timeout_ms:           60*1000,  
  strictSSL:            true,     
})

function twitterStreamGenerator(cb) {
  var stream = T.stream('statuses/filter', { track: ['#india'] })
  stream.on('tweet', function (tweet) {
       cb(tweet);
  })
}

module.exports = twitterStreamGenerator;
