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

app.post('/vote', function(request,response) {
    if(request.body)
        response.sendStatus(vote(request.body));
    else
        response.sendStatus(400);
});

app.post('/create', function(request,response){
    if(request.body) { 
        updateRoom(request.body.name);
        response.sendStatus(200);
    } else {
        response.sendStatus(400); 
    }
});

const step = 0.01;
const defaultValue = 0.5;

function vote(body) {
    let roomId = body.name;
    let dance = body.dance;
    let valens = body.valens;
    let instr = body.instr;
    if(roomId && dance && valens && instr) {
        updateRoom(roomId,Number(dance),Number(valens),Number(instr));
        return 200;
    }
    return 400;

}

function updateRoom(roomId, incDance, incValens, incInstr) {
  let oldValue = rooms.find({id: roomId}).toArray((err, res) => {
    if(err)
        throw err;
    if(res[0]) {
        if(isNaN(incDance) || isNaN(incValens) || isNaN(incInstr) || !(res[0].dance && res[0].valens && res[0].instr))
        return;
        
        rooms.update({id: roomId}, {$set: 
            {dance: Math.max(0,Math.min(1, (res[0].dance + step * incDance))),
            valens: (Math.max(0,Math.min(1, res[0].valens + step * incValens))),
            instr: (Math.max(0,Math.min(1, res[0].instr + step * incInstr)))
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
