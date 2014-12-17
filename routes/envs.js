var express =   require('express');
var spawn =     require('child_process').spawn;
var fork =      require('child_process').fork;
var _ =         require('lodash');
var nconf =     require('nconf');



nconf.argv().env();
nconf.defaults({ip: '127.0.0.1'});
var ip = nconf.get('ip');

var sh = require('shelljs/global');
var path = require('path');
var orion = path.join(process.cwd() , "../orion.client");
console.log("orion path")
var isUrl= function(url)
{
     var regexp = require('node-regexp')
           var re = regexp()
          .maybe(regexp.space)
          .must('http')
          .maybe('s')
          .must('://')
          .somethingBut(regexp.space)
          .ignoreCase()
          .toRegExp();

          var res = re.exec(url);
          console.log("res is " + res);
          return res;
}
var assert = require('assert');

function bin2String(array) {

  var result = "";
  for (var i = 0; i < array.length; i++) {

    result += String.fromCharCode(parseInt(array[i], 10));

  }

  return result;
}

function init(router){
router.post('/clone', function(req, res)
{

});
router.get('/env/open', function(req, res)
{
  console.log("body is " + req.body);
  console.log("query " + JSON.stringify(req.query));
  var params = req.query;
  res.redirect(params.url);
})
router.get('/env/all', function(req, res)
{
  console.log("body is " + req.body);
  console.log("query " + JSON.stringify(req.query));

  res.send(env);
})
var env = [];
router.post('/env/:name/kill', function(req, res)
{
  var name = req.params.name;
  var running = _.findKey(env, function(param)
  {
    return param.name === name
  });

  process.kill(running.pid);
  res.send(200);

});
router.post('/env', function(req, res)
{
  console.log("POST /env");
  req.params.name = "anonimous";
  createEnv(req, res);
});
var createEnv = function(req, res)
{
  console.log("in POST /env");
  var name = req.params.name;
  console.log('name is '  + name);
  console.log('req.query is ' + JSON.stringify(req.query));
  var p = fork('./modules/fresh-launcher/fcli.js', ['--port', 'auto', '-v', '--project', 'express', '--ip', ip], {cwd:orion, execPath : 'node'});
  env.push({name: name, pid: p.pid});
  p.on('message', function(m){
    console.log("message from child" + JSON.stringify(m));
    if (m.type === 'deploy')
    res.send({url : m.url});
  });
  p.on('error', function(err)
  {
    console.log('workspace was not started due to error ' + err);
  })
}

router.post('/env/:name', function(req, res)
{

  createEnv(req, res);
  return;

});
}


module.exports = init;
