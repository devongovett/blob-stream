var WritableStream = require('stream').Writable;
var createBlobStream = require('./create-blob-stream');

module.exports = createBlobStream(WritableStream);
