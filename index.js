var WritableStream = require('stream').Writable;
var util = require('util');
var Blob = require('blob');
var URL = global.URL || global.webkitURL || global.mozURL;

function BlobStream() {
  if (!(this instanceof BlobStream))
    return new BlobStream;
    
  WritableStream.call(this);
  this._chunks = [];
  this.length = 0;
}

util.inherits(BlobStream, WritableStream);

BlobStream.prototype._write = function(chunk, encoding, callback) {
  // convert chunks to Uint8Arrays (e.g. Buffer when array fallback is being used)
  if (!(chunk instanceof Uint8Array))
    chunk = new Uint8Array(chunk);
    
  this.length += chunk.length;
  this._chunks.push(chunk);
  callback();
};

BlobStream.prototype.toBlob = function(type) {
  return new Blob(this._chunks, {
    type: type || 'application/octet-stream'
  });
};

BlobStream.prototype.toBlobURL = function(type) {
  return URL.createObjectURL(this.toBlob(type));
};

module.exports = BlobStream;
