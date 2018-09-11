var AWS = require('aws-sdk');
var config = require('./config');
var producer = require('./twitter_stream_producer');
var kinesis = new AWS.Kinesis({region: config.kinesis.region});

// AWS.config.update(config.aws_local_config);
// var docClient = new AWS.DynamoDB.DocumentClient();
// var params = {
//   TableName: "businessTable",
// };
// docClient.scan(params, function(err, data) {
//   if (err) {
//       console.log(err);
//   } else {
//     console.log(data.Items);
//   }
// });

producer(kinesis, config.streamProducer).run();

