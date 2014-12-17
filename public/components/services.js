;(function(){
'use strict';
angular
  .module('codeFreshSiteApp')
  .service('$team', $team)
  .service('$subscribe', $subscribe)
  .service('$contactus', $contactus);
  /* @ngInject */
  function $team() {
    var team  = this.members = [];
    team.push(new Member({name : 'Front End Developer',
    title : 'CEO',
    description: ""}));
    team.push(new Member({name : 'Backend Developer', title : 'CTO'}));
    team.push(new Member({name : 'Devops Master', title : 'DevopsMaster'}));
  }

  function Member(info)
  {
    this.name = info.name;
    this.title = info.title;
    this.image = "http://webdevbuddy.files.wordpress.com/2012/06/boy-cartoon.png"
  }
  
  function $contactus($http) {
        this.loader = false;
        this.form = {
          name: '',
          email: '',
          message: ''
        };

        this.valid = {
          name: true,
          email: true,
          message: true
        };
        this.result = '';
        this.reset = function() {
            this.form = {
                name: '',
                email: '',
                message: ''
            };
            this.result = '';
        };
        
        this.validate = function() {
            var valid = true;
            if(this.form.name) {
                this.valid.name = true;
            }
            else {
                this.valid.name = false;
                valid = false;
            }

            if(this.form.email) {
                this.valid.email = true;
            }
            else {
                this.valid.email = false;
                valid = false;
            }
            
            if(this.form.message) {
                this.valid.message = true;
            }
            else {
                this.valid.message = false;
                valid = false;
            }

            return valid;
        };
        
        this.send = function() {
            if(!this.validate())
                return;
            
            if(this.loader) {
                console.log("loader...");
                return;
            }

            this.loader = true;

            var self = this;
            $http.post('/contact', {name: this.form.name,email: this.form.email, message: this.form.message}).
            then(function(response) {
                    // success
                    self.result = 'Your message has been sent!';
                    self.loader = false;
                }, 
                function(response) { // optional
                    // failed
                    self.result = 'Contact process failed , please contact <a href="mailto:contact@codefresh.io" target="_blank">contact@codefresh.io</a>';
                    self.loader = false;
                }
            );
        };
  }
  
  function $subscribe($http) {
    this.loader = false;
    this.form = {
        name: '',
        email: ''
    };
    this.valid = {
        name: true,
        email: true
    };
    this.result = '';
    this.reset = function() {
        this.form = {
            name: '',
            email: ''
        };
        this.result = '';
    };
    this.validate = function() {
        var valid = true;
        if(this.form.name) {
            this.valid.name = true;
        }
        else {
            this.valid.name = false;
            valid = false;
        }
        
        if(this.form.email) {
            this.valid.email = true;
        }
        else {
            this.valid.email = false;
            valid = false;
        }
        
        return valid;
        
    };
    this.send = function() {
        if(!this.validate())
            return;
        
        if(this.loader) {
            console.log("loader...");
            return;
        }
        
        this.loader = true;
        
        var self = this;
        $http.post('/subscribe', {name: this.form.name,email: this.form.email}).
        then(function(response) {
                // success
                self.result = 'User subscribed successfully! Look for the confirmation email';
                self.loader = false;
            }, 
            function(response) { // optional
                // failed
                self.result = 'Subscription failed , please contact <a href="mailto:contact@codefresh.io" target="_blank">contact@codefresh.io</a>';
                self.loader = false;
            }
        );
    };
      
      
  }


}).call(this);
