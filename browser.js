var WritableStream = require('stream-browserify').Writable;
var createBlobStream = require('./create-blob-stream');

module.exports = createBlobStream(WritableStream);

