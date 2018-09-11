var twitterStreamGenerator = require('./twitter_stream_generator');


function twitterStreamProducer(kinesis, config) {
  var waitBetweenPutRecordsCallsInMilliseconds = 5000

  // Creates a new kinesis stream if one doesn't exist.
  function _createStreamIfNotCreated(callback) {
    var params = {
      ShardCount: config.shards,
      StreamName: config.stream
    };

    kinesis.createStream(params, function(err, data) {
      _waitForStreamToBecomeActive(callback);
    });
  }

  // Checks current status of the stream.
  function _waitForStreamToBecomeActive(callback) {
    kinesis.describeStream({StreamName: config.stream}, function(err, data) {
      if (!err) {
        if (data.StreamDescription.StreamStatus === 'ACTIVE') {
          callback(null);
        }
        else {
          setTimeout(function() {
            _waitForStreamToBecomeActive(callback);
          }, 1000 * config.waitBetweenDescribeCallsInSeconds);
        }
      }
    });
  }

  // Sends batch of records to kinesis using putRecords API.
  function _sendToKinesis() {
    twitterStreamGenerator(function(data){
      console.log(data)

      var records = {
        Data: JSON.stringify(data),
        PartitionKey: "hello"
      };
      var recordsParams = {
        Records: [records],
        StreamName: config.stream
      };
      
      kinesis.putRecords(recordsParams , function(err, data) {
        if (err) {
          console.log(err);
        }
      });

    });
  }

  // function _sendToKinesisRecursively(totalRecords) {
  //   setTimeout(function() {
  //     _sendToKinesis(totalRecords, function() {
  //       _sendToKinesisRecursively(totalRecords);
  //     });
  //   }, waitBetweenPutRecordsCallsInMilliseconds);
  // }

  return {
    run: function() {
      _createStreamIfNotCreated(function(err) {
        _sendToKinesis()
      });
    }
  };
}

module.exports = twitterStreamProducer;