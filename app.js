var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://andreafoo11:andreafoo@cluster0-blvfe.mongodb.net/test?\
          retryWrites=true&w=majority";

const csv = require('csv-parser');
const fs = require('fs');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("companies");
  fs.createReadStream('companies.csv')
    .pipe(csv())
    .on('data', (row) => {
      var myobj = row;
      dbo.collection("companies").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 company inserted");
        db.close();
      });
    })
});

