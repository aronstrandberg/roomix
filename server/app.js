const http = require('http');
const fs = require('fs');
const express = require('express', '4.16.2');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

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
const port = 3001;

app.listen(port, () => console.log("Starting"));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/rooms', function (request, response) {
    rooms.find().toArray((err, res) => {
        if (err) {
            response.status(400).send(JSON.stringify({ error: err }));
        } else {
            response.status(200).send(JSON.stringify({ rooms: res }));
        }
    });
});

app.get('/getroom', function(request, response) {
  if (!request.body) {
    response.status(400).send("Missing body");
    return;
  }

  let roomName = request.body.name;

  let stuff = rooms.find({name: roomName}).toArray((err, res) => {
    if (err) {
      response.status(400).send("Failed to find room " + err);
      return;
    }
    if (res[0]) {
      let d = "{dance: " + res[0].dance + ", valens: " + res[0].valens + ", instr: " + res[0].instr + "}";
      response.status(200).send(d);
      return;
    }
    response.status(400).send("Failed to find room");
  });
});

app.post('/vote', function(request, response) {
    if(request.body) {
        let status = vote(request.body);
        response.status(200).send(JSON.stringify({ body: request.body }));
    }
    else {
        response.status(400).send(JSON.stringify({}));
    }
});

app.post('/create', function(request, response) {
    if(request.body) {
        updateRoom(request.body.name);
        response.status(200).send(JSON.stringify({ name: request.body.name }));
    } else {
        response.status(400).send(JSON.stringify({}));
    }
});

const step = 0.01;
const defaultValue = 0.5;

function vote(body) {
    let roomName = body.name;
    let dance = body.dance;
    let valens = body.valens;
    let instr = body.instr;
    if(roomName && dance && valens && instr) {
        updateRoom(roomName,Number(dance),Number(valens),Number(instr));
        return 200;
    }
    return 400;

}

function updateRoom(roomName, incDance, incValens, incInstr) {
  let oldValue = rooms.find({name: roomName}).toArray((err, res) => {
    if(err)
        throw err;
    if(res[0]) {
        if(isNaN(incDance) || isNaN(incValens) || isNaN(incInstr))
        return;

        rooms.update({name: roomName}, {$set:
            {dance: Math.max(0,Math.min(1, (res[0].dance + step * incDance))),
            valens: (Math.max(0,Math.min(1, res[0].valens + step * incValens))),
            instr: (Math.max(0,Math.min(1, res[0].instr + step * incInstr)))
            }});
    } else {
        rooms.insert({name: roomName,
            dance: defaultValue,
            valens: defaultValue,
            instr: defaultValue
        });
    }
  });
}
