var kcl = require('aws-kcl');

function recordProcessor() {

  return {

    initialize: function(initializeInput, completeCallback) {
      completeCallback();
    },

    processRecords: function(processRecordsInput, completeCallback) {

      if (!processRecordsInput || !processRecordsInput.records) {
        completeCallback();
        return;
      }
      var records = processRecordsInput.records;
      var record, data, sequenceNumber, partitionKey, objectToStore;
      for (var i = 0 ; i < records.length ; ++i) {
        record = records[i];
        data = new Buffer(record.data, 'base64').toString();
        sequenceNumber = record.sequenceNumber;
        partitionKey = record.partitionKey;
        if(partitionKey == 'hello'){
          console.log('===========================================********************************'); 
        }
        console.log(data);
      }

      if (!sequenceNumber) {
        completeCallback();
        return;
      }
      // If checkpointing, completeCallback should only be called once checkpoint is complete.
      processRecordsInput.checkpointer.checkpoint(sequenceNumber, function(err, sequenceNumber) {
        completeCallback();
      });
    },

    shutdown: function(shutdownInput, completeCallback) {
      if (shutdownInput.reason !== 'TERMINATE') {
        completeCallback();
        return;
      }
      shutdownInput.checkpointer.checkpoint(function(err) {
        completeCallback();
      });
    }
  
  }
}


kcl(recordProcessor()).run();