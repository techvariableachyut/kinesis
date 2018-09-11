var config = module.exports = {
  kinesis : {
    region : 'us-east-1'
  },

  streamProducer : {
    stream : 'achyutdeka02',
    shards : 2,
    recordsToWritePerBatch : 5,
    waitBetweenDescribeCallsInSeconds : 5,
    putRecordsTps : 20, 
  },

  aws_local_config: {
    region: 'local',
    endpoint: 'http://localhost:8000'
  },
};
