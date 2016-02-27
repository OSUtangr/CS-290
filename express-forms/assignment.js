var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

// forgot to uncomment this part ...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home');
});

app.get('/show-data',function(req,res){
  var context = {};
  context.sentData = req.query.myData;
  res.render('show-data', context);
});

app.get('/get-loopback',function(req,res){
  var qParams = "";
  for (var p in req.query){
    qParams += "The name " + p + " contains the value " + req.query[p] + ", ";
  }
  qParams = qParams.substring(0,qParams.lastIndexOf(','));
  qParams += '.';
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback', context);
});

app.get('/get-loopback-improved',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback-improved', context);
});

// New Code for Get Request
app.get('/getRequest', function(req,res){
  var queryParameters = [];
  // create an empty array for query parameters

  for (var parameters in req.query)
  {
    queryParameters.push({'name':param, 'value':req.query[param]});
  }
  // For each parameter in the query
  //    take the name of the parameter, place it in 'name'
  //    take the value of the parameter, palce it in 'value'
  //    put both variables in one variable in 'queryParameters'

  var context = {};
  context.dataList = queryParameters;
  // create a JSON 'context'
  // in 'context', put the array 'queryParameters' into a new sub-variable 
  //    'dataList' 

  res.render('GetRequest', context);
  // render this on the template based on 'GetRequest.handlebars'
  // use variable 'context' to fill in all information
})

app.post('/PostRequest', function(req,res){
  var queryParameters = [];
  // create an empty array


  for (var parameters in req.body)
  // for each variable in the Post
  {
    queryParameters.push({'name':param, 'value':req.body[param]});
    // push into queryParameter another variable with 
    //  'name' = name of the parameter
    //  'value' = value of the parameter
  }

  var context = {};
  res.render('PostRequest', context);
})

app.post('/post-loopback', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
  res.render('post-loopback', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
