#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');


var http = require("http");


var dbv;

var MongoClient = require('mongodb').MongoClient;

//maybe don't need
// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/emc';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}




// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}


function getGoogTrends(){
    var cheerio = require("cheerio");

            var url = "http://www.google.com/trends/";
            respArr = [
            {"word":"nba", "hotness":1, "timestamp": new Date()},
            {"word":"fitness", "hotness":1, "timestamp": new Date()},
            {"word":"nfl", "hotness":1, "timestamp": new Date()},
             {"word":"immigration", "hotness":1, "timestamp": new Date()},
            {"word":"obama", "hotness":1, "timestamp": new Date()},
            {"word":"kardashian", "hotness":1, "timestamp": new Date()}
             ,{"word":"music", "hotness":1, "timestamp": new Date()},
            {"word":"new york", "hotness":1, "timestamp": new Date()},
            {"word":"soccer", "hotness":1, "timestamp": new Date()},
             {"word":"basketball", "hotness":1, "timestamp": new Date()},
            {"word":"clinton", "hotness":1, "timestamp": new Date()},
            {"word":"lebron", "hotness":1, "timestamp": new Date()},
             {"word":"hockey", "hotness":1, "timestamp": new Date()},
            {"word":"nfl", "hotness":1, "timestamp": new Date()},
            {"word":"brazil", "hotness":1, "timestamp": new Date()},
             {"word":"breaking bad", "hotness":1, "timestamp": new Date()},
            {"word":"game of thrones", "hotness":1, "timestamp": new Date()},
            {"word":"mlb", "hotness":1, "timestamp": new Date()},




            //second batch

              {"word":"television", "hotness":1, "timestamp": new Date()},
            {"word":"pop culture", "hotness":1, "timestamp": new Date()},
            {"word":"e news", "hotness":1, "timestamp": new Date()},
             {"word":"today show", "hotness":1, "timestamp": new Date()},
            {"word":"house of cards", "hotness":1, "timestamp": new Date()},
            {"word":"#houseofcards", "hotness":1, "timestamp": new Date()}
             ,{"word":"hbo", "hotness":1, "timestamp": new Date()},
            {"word":"vegas", "hotness":1, "timestamp": new Date()},
            {"word":"putin", "hotness":1, "timestamp": new Date()},
             {"word":"airlines", "hotness":1, "timestamp": new Date()},
            {"word":"financial services", "hotness":1, "timestamp": new Date()},
            {"word":"internet culture", "hotness":1, "timestamp": new Date()},
             {"word":"war", "hotness":1, "timestamp": new Date()},
            {"word":"america", "hotness":1, "timestamp": new Date()},
            {"word":"reality tv", "hotness":1, "timestamp": new Date()},
             {"word":"#firstworldpains", "hotness":1, "timestamp": new Date()},
            {"word":"president", "hotness":1, "timestamp": new Date()},
            {"word":"south korea", "hotness":1, "timestamp": new Date()},



              {"word":"bottled water", "hotness":1, "timestamp": new Date()},
            {"word":"real housewives", "hotness":1, "timestamp": new Date()},
            {"word":"hiphop wives", "hotness":1, "timestamp": new Date()},
             {"word":"weight loss solutions", "hotness":1, "timestamp": new Date()},
            {"word":"weight loss secret", "hotness":1, "timestamp": new Date()},
            {"word":"pill", "hotness":1, "timestamp": new Date()}
             ,{"word":"entertainment", "hotness":1, "timestamp": new Date()},
            {"word":"vogue", "hotness":1, "timestamp": new Date()},
            {"word":"espn", "hotness":1, "timestamp": new Date()},
             {"word":"mac", "hotness":1, "timestamp": new Date()},
            {"word":"iphone", "hotness":1, "timestamp": new Date()},
            {"word":"bitcoin mining", "hotness":1, "timestamp": new Date()},
             {"word":"clouds", "hotness":1, "timestamp": new Date()},
            {"word":"brown", "hotness":1, "timestamp": new Date()},
            {"word":"mind", "hotness":1, "timestamp": new Date()},
             {"word":"time", "hotness":1, "timestamp": new Date()},
            {"word":"float", "hotness":1, "timestamp": new Date()},
            {"word":"hang", "hotness":1, "timestamp": new Date()},






              {"word":"go", "hotness":1, "timestamp": new Date()},
            {"word":"love", "hotness":1, "timestamp": new Date()},
            {"word":"meme", "hotness":1, "timestamp": new Date()},
             {"word":"guitar", "hotness":1, "timestamp": new Date()},
            {"word":"how to", "hotness":1, "timestamp": new Date()},
            {"word":"secret steps", "hotness":1, "timestamp": new Date()}
             ,{"word":"bestseller", "hotness":1, "timestamp": new Date()},
            {"word":"cincinatti", "hotness":1, "timestamp": new Date()},
            {"word":"ohio", "hotness":1, "timestamp": new Date()},
             {"word":"saint louis", "hotness":1, "timestamp": new Date()},
            {"word":"detroit", "hotness":1, "timestamp": new Date()},
            {"word":"philly", "hotness":1, "timestamp": new Date()},
             {"word":"miami", "hotness":1, "timestamp": new Date()},
            {"word":"toronto", "hotness":1, "timestamp": new Date()},
            {"word":"tokyo", "hotness":1, "timestamp": new Date()},
             {"word":"seoul", "hotness":1, "timestamp": new Date()},
            {"word":"cape town", "hotness":1, "timestamp": new Date()},
            {"word":"travel", "hotness":1, "timestamp": new Date()},





              {"word":"happiness", "hotness":1, "timestamp": new Date()},
            {"word":"diet secret", "hotness":1, "timestamp": new Date()},
            {"word":"skinny", "hotness":1, "timestamp": new Date()},
             {"word":"beverly hills", "hotness":1, "timestamp": new Date()},
            {"word":"hollywood", "hotness":1, "timestamp": new Date()},
            {"word":"90210", "hotness":1, "timestamp": new Date()}
             ,{"word":"breaking news", "hotness":1, "timestamp": new Date()},
            {"word":"this just in", "hotness":1, "timestamp": new Date()},
            {"word":"onion", "hotness":1, "timestamp": new Date()},
             {"word":"programming", "hotness":1, "timestamp": new Date()},
            {"word":"ruby", "hotness":1, "timestamp": new Date()},
            {"word":"php", "hotness":1, "timestamp": new Date()},
             {"word":"jquery", "hotness":1, "timestamp": new Date()},
            {"word":"python", "hotness":1, "timestamp": new Date()},
            {"word":"sxsw", "hotness":1, "timestamp": new Date()},
             {"word":"baseball", "hotness":1, "timestamp": new Date()},
            {"word":"washington", "hotness":1, "timestamp": new Date()},
            {"word":"food", "hotness":1, "timestamp": new Date()},


             {"word":"oprah", "hotness":1, "timestamp": new Date()},
            {"word":"chelsea", "hotness":1, "timestamp": new Date()},
            {"word":"main st", "hotness":1, "timestamp": new Date()},
             {"word":"wall st.", "hotness":1, "timestamp": new Date()},
            {"word":"meatpacking", "hotness":1, "timestamp": new Date()},
            {"word":"midtown", "hotness":1, "timestamp": new Date()}
             ,{"word":"downtown", "hotness":1, "timestamp": new Date()},
            {"word":"hong kong", "hotness":1, "timestamp": new Date()},
            {"word":"best beaches", "hotness":1, "timestamp": new Date()},
             {"word":"getaway", "hotness":1, "timestamp": new Date()},
            {"word":"gilt", "hotness":1, "timestamp": new Date()},
            {"word":"fancy", "hotness":1, "timestamp": new Date()},
             {"word":"jesus", "hotness":1, "timestamp": new Date()},
            {"word":"cartoon", "hotness":1, "timestamp": new Date()},
            {"word":"funny", "hotness":1, "timestamp": new Date()},
             {"word":"hilarious", "hotness":1, "timestamp": new Date()},
            {"word":"lol", "hotness":1, "timestamp": new Date()},
            {"word":"roflmao", "hotness":1, "timestamp": new Date()}
           ];
            download(url, function(data) {
              if (data) {
                // console.log(data);
                var $ = cheerio.load(data);
                $(".hottrends-single-trend-title").each(function(i, e) {
                   
                    trendWord= $(this).html()
                   hotness= parseInt($(this).parent().parent().children(1).children('span').children('span').html().replace(/,/g, ""));
                    //console.log(trendWord);
                respArr.push({"word":trendWord, "hotness":hotness, "timestamp": new Date()});
                 // console.log(poster+": ["+link.html()+"]("+link.attr("href")+")");
                });

               for(i in respArr){

                getSaveTwitterLinks(respArr[i]['word'])
               }


//start mongo save
        MongoClient.connect('mongodb://'+connection_string, function(err, db) {
            if(err) { console.log('mongo err'); return;}
             dbv = db;
             //db.getCollection("googletrends").ensureIndex ({"a" : 1}, {unique: true})
            dbv.collection('googletrends').insert( respArr,function(err, records){
            //  console.log("Record added as "+records[0]._id);

            })
            dbv.close();
            dbv.close();
        })


                          //end mongo save

              }
            });
}


function getSaveTwitterLinks(keyword){

    twitterRes= [];
    console.log('getting links on twitter for search of: '+ keyword)
           
            if(typeof keyword == "undefined"){
                //res.send('{"status":"fail", "reason":"please send keyword"}')
                return;
            }
            var util = require('util'),
                twitter = require('twitter');
            var twit = new twitter({
                consumer_key: 'UdfmDp6m2wQ80z4dgvJv8dFCF',
                consumer_secret: 'VtqMbo3SOaeYQJ6NwN99L15umLbjJJOKV3yCM4QhVERJuLtb7S',
                access_token_key: '181814332-tpkBfT0iMngcJCWnZ7lCQoGvvwSuzSmcR2QnOlqu',
                access_token_secret: 'K7CDQo6f9HQ9ieCcWQ9jbImWB195xey4ZUWNhug94MMLR'
            });


            twitterResEng=[];
            twitterLinks=[];

            insArr=[];
            params = {count:200, lang:"en", "result_type":'recent'};
            links = twit.search(keyword, params , function(data) {

                twitterRes= data['statuses'];
                for(i in twitterRes){
                    try{
                        if(twitterRes[i]['entities']['urls'][0]['expanded_url']!=''){
                                insArr.push({"link":twitterRes[i]['entities']['urls'][0]['expanded_url'], "timestamp":new Date(), "keyword":keyword})
                            

                            twitterLinks.push(twitterRes[i]['entities']['urls'][0]['expanded_url']);
                        }
                    }
                    catch(err){

                            // do nothing.... doesn't have link
                    }
                    
                    if(twitterRes[i]['metadata']['iso_language_code']=="en")
                        twitterResEng.push(twitterRes[i]);
                }
                 //res.send(JSON.stringify(twitterResEng));
                 console.log(twitterLinks);
             

                        MongoClient.connect('mongodb://'+connection_string, function(err, db) {
            if(err) { console.log('mongo err'); return;}
             dbv = db;

           dbv.collection("twitterLinks").ensureIndex ("link", {unique: true}, function(){})
            dbv.collection('twitterLinks').insert( insArr,function(err, records){
           
            })
             dbv.close();
             dbv.close();
        })
                 //return(twitterLinks);

                        //console.log(util.inspect(data));
              })
             return links;
                //return;

}
/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };

         self.routes['/api/googletrends'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            //res.send(self.cache_get('index.html') );


            var cheerio = require("cheerio");

            var url = "http://www.google.com/trends/";
            respArr = [];
            download(url, function(data) {
              if (data) {
                // console.log(data);
                var $ = cheerio.load(data);
                $(".hottrends-single-trend-title").each(function(i, e) {
                   
                    trendWord= $(this).html()
                   hotness= parseInt($(this).parent().parent().children(1).children('span').children('span').html().replace(/,/g, ""));
                    console.log(trendWord);
                respArr.push({"word":trendWord, "hotness":hotness, "timestamp": new Date()});
                 // console.log(poster+": ["+link.html()+"]("+link.attr("href")+")");
                });

                res.send(JSON.stringify(respArr));


//start mongo save
        MongoClient.connect('mongodb://'+connection_string, function(err, db) {
            if(err) { console.log('mongo err'); return;}
             dbv = db;
             //db.getCollection("googletrends").ensureIndex ({"a" : 1}, {unique: true})
            dbv.collection('googletrends').insert( respArr,function(err, records){
            //  console.log("Record added as "+records[0]._id);
            })
        })


                          //end mongo save

              }
            });

        };

           self.routes['/api/twittersearch'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            twitterRes= [];

            keyword = req.query.keyword;
            if(typeof keyword == "undefined"){
                res.send('{"status":"fail", "reason":"please send keyword"}')
                return;
            }
            var util = require('util'),
                twitter = require('twitter');
            var twit = new twitter({
                consumer_key: 'UdfmDp6m2wQ80z4dgvJv8dFCF',
                consumer_secret: 'VtqMbo3SOaeYQJ6NwN99L15umLbjJJOKV3yCM4QhVERJuLtb7S',
                access_token_key: '181814332-tpkBfT0iMngcJCWnZ7lCQoGvvwSuzSmcR2QnOlqu',
                access_token_secret: 'K7CDQo6f9HQ9ieCcWQ9jbImWB195xey4ZUWNhug94MMLR'
            });


            twitterResEng=[];
            twitterLinks=[];
            params = {count:200, lang:"en", "result_type":'recent'};
            twit.search(keyword, params , function(data) {

                twitterRes= data['statuses'];
                for(i in twitterRes){
                    try{
                        if(twitterRes[i]['entities']['urls'][0]['expanded_url']!=''){

                            twitterLinks.push(twitterRes[i]['entities']['urls'][0]['expanded_url']);
                        }
                    }
                    catch(err){

                            // do nothing.... doesn't have link
                    }
                    
                    if(twitterRes[i]['metadata']['iso_language_code']=="en")
                        twitterResEng.push(twitterRes[i]);
                }
                 //res.send(JSON.stringify(twitterResEng));
                 res.send(JSON.stringify(twitterLinks));

                        //console.log(util.inspect(data));
              })
             
                return;



    };


    self.routes['/api/scheduleTwitter']= function(req, res){


        var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

rule.minute = new schedule.Range(0, 59, 5);

var k = schedule.scheduleJob(rule, function(){
    console.log('starting timer');
    //gets gogle trends, queries twitter, gets links, saves unique all new to mongo
    r= getGoogTrends();
    //console.log(r);
    
   //self.routes['/api/twittersearch'](req, res);
});
  res.send('scheduled');
    }

    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();









