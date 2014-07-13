var _ = require('underscore');
var Q = require('q');

var Receptionist = (function(){
		
	var root = this,
		recognition,
		final_transcript = '',
		recognizing = false,
		speechCallback = false,
		options = {},
		people,
		listenBtn;

	var defaults = {
			name: 'robin',
			speechTrigger: 'robin',
			rosterURL: 'people.json',
			imageBase: 'http://static.onemightyroar.com/site-assets/images/roster/',
			voiceEnabled: true
	}

	function _Receptionist(config){
		this.options = _.extend(defaults, config);
		this.setName(this.options.name);
		this.actions = [];

		if (!config.speechTrigger){
			// If no configuration default to name as trigger
			this.speechTrigger = this.getName().toLowerCase();
		}

		console.log('Receptionist started as \"' + this.getName() + '\"');
		
		// Get our DOM lined up
		listenBtn = document.getElementById('listen');
		searchedFor = document.getElementById('searchedFor');
		matchedDisplay = document.getElementById('matched');
		
		return this;
	}

	_Receptionist.prototype.load = function(){
		var deferred = Q.defer();
		if(this.options.voiceEnabled){
			this.loadSpeech()
		}
		loadJSON(this.options.rosterURL, function(rosterData){
			people = rosterData;
			deferred.resolve();
		}, function(xhr){
			deferred.reject(xhr);
		});
		return deferred.promise;
	}

	_Receptionist.prototype.loadSpeech = function() {
		var _this = this;
		if (!('webkitSpeechRecognition' in window)) {
	  		upgrade();
		} else {
			recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.onstart = function() {
				recognizing = true;
				final_transcript = '';
				searchedFor.innerHTML = '';
				listenBtn.textContent = 'Listening';
			}
			recognition.onresult = function(event) {
				var interim_transcript = '';
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i][0].confidence < .5){
						//console.log('Not enough confidence to translate');
						return false;
					}
					var soundbite = event.results[i][0].transcript;
				  if (event.results[i].isFinal) {
				  	this.commandActive = false;
				  	console.groupCollapsed('%cLet\'s see what I can do...', 'color:green;');
				  	console.log('You said: ' + soundbite.trim().toLowerCase());
				  	console.log('I have ' + Math.floor(event.results[i][0].confidence * 100).toFixed(2) + '% confidence');
				  	console.groupEnd();
				  	_this.checkCommands(soundbite);
				    final_transcript = event.results[i][0].transcript;
				  } else {
				  	if (soundbite.trim().toLowerCase() == "robin" && !this.commandActive){
				  		console.log('%cRobin Active', 'color:red;');
				  		_this.trigger('callout', soundbite);
				  		this.commandActive = true;
				  	}
				    interim_transcript += event.results[i][0].transcript;
				  }
				}

				if (final_transcript != ''){
					searchedFor.innerHTML = '<strong>I heard:</strong> \"' + final_transcript.trim() + '\"';
					if (isDefined(speechCallback)){
						speechCallback(final_transcript.trim().toLowerCase());
					}
				}
			}
			recognition.onerror = function(event) {}
			recognition.onnomatch = function(event){
				// Couldn't hear anything
			}
			recognition.onend = function() {
				recognizing = false;
				listenBtn.textContent = 'Listen';
				console.log('Turned voice off');
			}
		}
	}

	_Receptionist.prototype.checkCommands = function (rawSpeech) {
    rawSpeech = rawSpeech.trim().toLowerCase();
    var words = rawSpeech.split(' ');
    var keyword = words[0];

    if (keyword == this.speechTrigger){
    	// Strip out keyword
    	var command = words.slice(1).join(' ').trim().toLowerCase();
      console.log('This is a receptionist command. Trigger:', keyword);
      this.trigger('speech', {command: command, raw: rawSpeech});
    }else{
      return false;
    }
	}

	_Receptionist.prototype.stopListening = function() {
		if (recognizing) {
			recognition.stop();
			recognizing = false;
			recognition.commandActive = false;
		};
	}

	_Receptionist.prototype.startListening = function() {
		recognition.start();
		recognizing = true;
	}

	_Receptionist.prototype.on = function(evt, callback) {
		this.actions[evt] = callback;
	}

	_Receptionist.prototype.trigger = function(evt, data) {
		if (this.actions[evt]){
			this.actions[evt](data);
		}
		return this;
	}

	/**
	* Toggle recognition states
	* @return Receptionist
	*/
	_Receptionist.prototype.listen = function() {
		if (recognizing){
			this.stopListening();
		}else{
			this.startListening();
		}
		return this;
	}

	_Receptionist.prototype.setName = function (assignment) {
		this.name = assignment;
	}

	_Receptionist.prototype.getName = function(){
		return this.name;
	}

	_Receptionist.prototype.showPerson = function(person) {
		if (!person){
			console.log('We need a person to display');
			return;
		}
		matchedDisplay.innerHTML = '<img width="400px" src="' + this.options.imageBase + person.picture + '" alt="' + person.name + '"> <p>' + person.title + '</p>';
	}

	_Receptionist.prototype.upgrade = function() { 
		console.log('Update to a webkit browser for speech');
	}

	_Receptionist.prototype.search = function(term, pool) {
		if (!isDefined(pool)) pool = people;
		var matchedPerson = getObjects(pool, 'name', term);
		return matchedPerson || false;
	}
	
	return _Receptionist;

})(this);

module.exports = Receptionist;
global.Receptionist = Receptionist;
