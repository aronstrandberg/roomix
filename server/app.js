const http = require('http');
const fs = require('fs');
const express = require('express', '4.16.2');
const bodyParser = require('body-parser');


const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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

app.listen(port, () => console.log("Starting"));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', (req,res) => {
    updateRoom(1,1,1,1);
    updateRoom(2,-1,-1,-1);
    updateRoom(3, 1,1,1);
});

app.post('/test', (req,res) => {
    console.log("WOHOH",  req.body);
});

app.post('/create', (req,res) => {
    res.send("200", "HEJSAN");
    console.log(req); 
});

const step = 0.01;
const defaultValue = 0.5;

function updateRoom(roomId, incDance, incValens, incInstr) {
  let oldValue = rooms.find({id: roomId}).toArray((err, res) => {
    if(err)
        throw err;
    if(res[0]) {
        rooms.update({id: roomId}, {$set: 
            {dance: (res[0].dance + step * incDance),
            valens: (res[0].valens + step * incValens),
            instr: (res[0].instr + step * incInstr)
            }});
    } else {
        rooms.insert({id: roomId, 
            dance: defaultValue,
            valens: defaultValue,
            instr: defaultValue 
        });
    }
  });
}
