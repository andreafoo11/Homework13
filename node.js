var express=require("express"); 
var bodyParser=require("body-parser");
var http = require ("http"); 
var adr = require ("url");

  
const MongoClient = require('mongodb').MongoClient; 
var url = "mongodb+srv://andreafoo11:andreafoo@cluster0-blvfe.mongodb.net/test?\
          retryWrites=true&w=majority";
var app = express() 

const path = require('path');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write  ("<html><head><style type='text/css'>.col {  \
              display: inline-block; \
              width:40px;\
              border: 1px solid #333;\
            } \
            body { \
              background-color: beige;\
              text-align: center;\
            }</style></head>");
  res.write("<h1>Result of Search:</h1><br />");
  var qobj = adr.parse(req.url, true).query;
  var search = qobj.myselect;
  var value = qobj.search_value;
  var query;
  if(search == 1) {
      query = { Company: value };
  }
  else if (search == 2) {
    query = { Ticker: value };
  }
  MongoClient.connect(url, 
    function(err, db) {
      if (err) {
        res.write("<body> Your Search is invalid");
        res.end("</body></html>");
      }
      var dbo = db.db("companies");
      dbo.collection("companies").find(query , { projection : { _id: 0, 
                Company: 1, Ticker: 1 } }).toArray(function(err, result) {
                      if (err) {
                        res.write("<body> Your Search is invalid");
                        res.end("</body></html>");
                        db.close();
                      }
                      res.write("<body>Company: " + result[0].Company + "<br>");
                      res.write("Stock Ticker: " + result[0].Ticker + "<br>");
                      res.end("</body></html>");
                      db.close();
                  }
              );      
      
  }); 
  
}).listen(8080);
  
