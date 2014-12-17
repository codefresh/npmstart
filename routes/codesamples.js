var express = require('express');

module.exports = (function() {
    'use strict';
    var codesamples = express.Router();
    
    
    
    codesamples.get('/categories', function(req, res) {
        res.send(categories);
    });

    codesamples.get('/codesamplecollection', function(req, res) {
        res.send(samples);
    });
    
    codesamples.post('/search', function(req, res) {
	var samples_clone = [];
	if (req.body.category) {
	    //filter by category:
	    console.log("filter by category");
	    var c = 0;
	    for(var i in samples) {
		if(samples[i].categories.indexOf(req.body.category)>-1) {
		    samples_clone.push(samples[i]);
		}
		c++;
	    }
	}
	
        res.send(samples_clone);
    });
    
    codesamples.get('/tags', function(req, res) {    	
    	var query = req.query.q;
    	
    	var tagsList=[];
        var i,j,sample,u={};
        for(i in samples) {
        	sample=samples[i];
        	//console.log(sample.tags)
        	for(j in sample.tags) {
        		if(u.hasOwnProperty(sample.tags[j])) {
     				continue;
  				}
  				
  				if(sample.tags[j].toLowerCase().search(query.toLowerCase(),"i")>-1) {
	  				tagsList.push(sample.tags[j]);
					u[sample.tags[j]] = 1;	
  				}
				
        	}
        }
    	
    	
        res.send(tagsList);
    });

    return codesamples;
})();

var categories = [
	{
	    name: "express",
	    logo: "express.png",
	    desc: "Web application framework for node",
	    color: ""
	},
	{
	    name: "mongo",
	    logo: "mongo.png",
	    desc: "An open source NoSQL database",
	    color: "blue"
	},
	{
	    name: "heroku",
	    logo: "heroku.png",
	    desc: "An cloud platform as a service supporting node",
	    color: "orange"
	},
	{
	    name: "testing",
	    logo: "testing.png",
	    desc: "Testing tools for javascript",
	    color: "gray"
	}
    ];

var samples=[
  {
    "id": "express",
    "name": "express example 1",
    "type": "1",
    "ready": true,
    "caption-text": "Web application framework for node",
    "caption-image": "express.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"",
        "link": ""
      },
     "tags":["nodejs","node","node.js","express","web"],
     "categories": ["express"]
  },
  {
    "id": "express",
    "name": "express example 2",
    "type": "1",
    "ready": true,
    "caption-text": "Web application framework for node",
    "caption-image": "express.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"",
        "link": ""
      },
     "tags":["nodejs","node","node.js","express","web"],
     "categories": ["express"]
  },
  {
    "id": "mongo",
    "name": "mongo example 1",
    "type": "1",
    "ready": false,
    "caption-text": "An open source NoSQL database",
    "caption-image": "mongo.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"",
        "link": ""
      },
     "tags":["nodejs","node","node.js","rest","mongo","mongodb","mongoose"],
     "categories": ["mongo"]
  },
  {
    "id": "mongo",
    "name": "mongo example 2",
    "type": "1",
    "ready": false,
    "caption-text": "An open source NoSQL database",
    "caption-image": "mongo.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"",
        "link": ""
      },
     "tags":["nodejs","node","node.js","rest","mongo","mongodb","mongoose"],
     "categories": ["mongo"]
  },
  {
    "id": "mongo",
    "name": "mongo example 3",
    "type": "1",
    "ready": false,
    "caption-text": "An open source NoSQL database",
    "caption-image": "mongo.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"",
        "link": ""
      },
     "tags":["nodejs","node","node.js","rest","mongo","mongodb","mongoose"],
     "categories": ["mongo"]
  },
  {
    "id": "heroku",
    "name": "heroku example 1",
    "type": "1",
    "ready": false,
    "caption-text": "An cloud platform as a service supporting node",
    "caption-image": "heroku.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"",
        "link": ""
      },
     "tags":["cloud","cloud platform","heroku","server","node","nodejs","node.js"],
     "categories": ["heroku"]
  },
  {
    "id": "spyjs",
    "name": "spyjs example",
    "type": "1",
    "ready": false,
    "caption-text": "spy-js is a tool for JavaScript developers that allows to simply debug/trace/profile JavaScript",
    "caption-image": "spyjs.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"spy-js/spy-js",
        "link": "https://github.com/spy-js/spy-js"
      },
    "tags":["spyjs","spy","js","javascript"],
    "categories": ["testing"]
  },
  {
    "id": "mocha",
    "name": "mocha example",
    "type": "1",
    "ready": false,
    "caption-text": "Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser. ",
    "caption-image": "mocha.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"mochajs/mocha",
        "link": "https://github.com/mochajs/mocha"
      },
    "tags":["mocha","js","javascript","node","nodejs","node.js"],
    "categories": ["testing"]
  },
  {
    "id": "restify",
    "name": "restify",
    "type": "1",
    "ready": false,
    "caption-text": "Restify is a node.js module built specifically to enable you to build correct REST web services.",
    "caption-image": "npmblank.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"mcavage/node-restify",
        "link": "https://github.com/mcavage/node-restify"
      },
    "tags":["rest","restify","node","nodejs","node.js"],
    "categories": []
  },
  {
    "id": "jade",
    "name": "jade",
    "type": "1",
    "ready": false,
    "caption-text": "Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node.",
    "caption-image": "jade.png",
    "caption-links":
      {
        "id": 0,
        "type": "github",
        "name" :"jadejs/jade",
        "link": "https://github.com/jadejs/jade"
      },
    "tags":["jade","templates","node","nodejs","node.js","js","javascript"],
    "categories": []
  }
];