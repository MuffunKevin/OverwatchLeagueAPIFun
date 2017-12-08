var http = require('https');

var options = {
  host: 'overwatchleague.com',
  path: '/en-us/api/live-match?locale=en-us'
};

setInterval(loadScore, 5000);

function loadScore() {
  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);//console.log('HEADERS: ' + JSON.stringify(res.headers));
  
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
  
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //console.log('BODY: ' + body);
      // ...and/or process the entire body here.
  
      var resultAsJson = JSON.parse(body);
      console.log(resultAsJson.data.liveMatch.competitors[0].name + " " + resultAsJson.data.liveMatch.scores[0].value + " " + resultAsJson.data.liveMatch.competitors[1].name + " " + resultAsJson.data.liveMatch.scores[1].value);
    })
  });
  
  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
}