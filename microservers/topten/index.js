var thrift = require('thrift');
var TopTenService = require('./gen-nodejs/TopTenService');
var types = require('./gen-nodejs/topten_types');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://username:password@url:port/db";
var data=[];
var gifs;

//sorting function because you know, thats exactly what we need
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

//this is what sends out information 
var server = thrift.createServer(TopTenService, {
    topten: function(text) {

    	//we connect to the database right here
    	MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("gif_db");
		  dbo.collection("gifs").find({}).toArray(function(err, result) {
		    if (err) throw err;
		    //console.log(result);
		    //we sort the results of the database and send it right to "data"
		    data = result.sort(dynamicSort("rating"))
		    db.close();
		  });
		});

    	//we slice data, becasue you know, we only want the top 10 gifs
    	data = data.slice(0,9)

    	//we send the information as an string because its easier as hell
		gifs = JSON.stringify(data)
		console.log(data);

        return gifs + "\n";
    }
});
    
server.listen(process.env.PORT || 9000);