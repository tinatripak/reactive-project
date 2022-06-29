let db;

const mongodb = require("mongodb");
const express = require("express");

const connectionURL = 'mongodb+srv://admin2:x45JNZLhtrDXG2YD@ukrainiansunbeam.0ndwc.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'reactive'
const MongoClient = mongodb.MongoClient;
let firstDate;
let secondData;

const topTenTopics = [
  {
      $group : {
        _id:'$Topic', 
        count:{
          $sum:'$EditCount'
        }
      }
  },
  {
      $sort: {
        count: -1
      }
  } ,
  { 
      $limit : 10 
  }
];

const topEditor = [
  {
    $match: {
      Date : {
        $gte: firstDate,
        $lte: secondData
      }
    }
  },
  {
    $group : {
      _id:'$UserName', 
      count:{
        $sum:'$EditCount'
      }
    }
  },
  {  
    $sort: {
      count: -1
    }
  },
  {
    $limit : 1
  }
];

const app = express();
app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

let json = [];
MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true},(err,connectedClient) => {
    if(err){
      throw err;
    }
    db = connectedClient.db(dbName);

    app.get("/topics", (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      db.collection('topics').aggregate(topTenTopics).toArray()
      .then(r => {
        res.json(r);
        res.end();
    })
      .catch(e => {
        console.error('ERROR:',e);
      })
    });
    
    app.get("/users/:year", (req, res) => {
      const year = req.params.year;
      res.setHeader("Access-Control-Allow-Origin", "*");
      firstDate = new Date(year, 01, 01, 0, 0, 0);
      secondData = new Date(firstDate.getFullYear() + 1, firstDate.getMonth(), firstDate.getDate());
      
      topEditor[0].$match.Date.$gte = firstDate
      topEditor[0].$match.Date.$lte = secondData
      
      db.collection('users').aggregate(topEditor).toArray()
      .then(r => {
          res.json(r);
          res.end();
      })
      .catch(e => {
          console.error('ERROR:',e);
      })
    });
    app.get("/users/:year/:month", (req, res) => {
      const year = req.params.year;
      const month = req.params.month;
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      firstDate = new Date(year, month, 01, 0, 0, 0);
      secondData = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, firstDate.getDate() - 1, 23, 59, 59);
      
      topEditor[0].$match.Date.$gte = firstDate
      topEditor[0].$match.Date.$lte = secondData

      db.collection('users').aggregate(topEditor).toArray()
      .then(r => {
          res.json(r);
          res.end();
      })
      .catch(e => {
          console.error('ERROR:',e);
      })
    });
    app.get("/users/:year/:month/:day", (req, res) => {
      const year = req.params.year;
      const month = req.params.month;
      const day = req.params.day;
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      firstDate = new Date(year, month, day, 0, 0, 0);
      secondData = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate(), 23, 59, 59);
      
      topEditor[0].$match.Date.$gte = firstDate
      topEditor[0].$match.Date.$lte = secondData

      db.collection('users').aggregate(topEditor).toArray()
      .then(r => {
          res.json(r);
        res.end();
      })
      .catch(e => {
          console.error('ERROR:',e);
      })
    });
})
