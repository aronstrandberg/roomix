const http = require('http');
var MongoClient = require('mongodb').MongoClient;

var rooms;
var db = MongoClient.connect('mongodb://127.0.0.1:27017/potatochip', (err, db) => {
    if(err)
        throw err;
    console.log("Connected to mongo");
    rooms = db.collection('rooms');
});

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("HELLO");
});

server.listen(port, hostname, () => {
    console.log(" WE ARE RUNNING " );
    updateTrait("1", "dance", 1)
});



const step = 0.01

function updateTrait(roomId, trait, inc) {
  console.log(rooms)
  let oldValue = rooms.find({id: 1})[0].trait
  rooms.update({id: roomId}, {$set: {trait: oldValue + step * inc}})
}
