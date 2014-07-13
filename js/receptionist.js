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
				console.log('Turned voice on');
			}
			recognition.onresult = function(event) {
				var interim_transcript = '';
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i][0].confidence < .5){
						//console.log('Not enough confidence to translate');
						return false;
					}
				  if (event.results[i].isFinal) {
				  	var soundbite = event.results[i][0].transcript;
				  	console.log('%c' + soundbite.trim().toLowerCase(), 'color:green;', event.results[i][0].confidence);
				  	_this.checkCommands(soundbite);
				    final_transcript = event.results[i][0].transcript;
				  } else {
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
    console.log('Checking for speech commands');
    rawSpeech = rawSpeech.trim().toLowerCase();
    var words = rawSpeech.split(' ');
    var keyword = words[0];
    
    console.log(words, keyword);

    if (keyword == this.speechTrigger){
      console.log('This is a receptionist command');
      switch (words[1]) {
        case 'notify' :
          var to = words[2];
          var message = words.splice(3).join(' ');
          console.log(to + ':', message)
          break;
        case 'book' :
        	var target = words.splice(2).join(' ');
        	console.log('Booking:', target);
        	break;
        case 'go' :
        	var fragment = words.splice(2).join(' ');
        	if (fragment == "off the record"){
        		console.log('Notes disabled');
        		recognition.stop();
        	}
        	break;
        case 'find':
        	var needle = words.splice(2).join(' ');
        	var searchResults = this.search(needle);
        	if (searchResults.length > 0) {
        		this.showPerson(searchResults[0]);
        	}
        	break;
      }
    }else{
      return false;
    }
	}

	_Receptionist.prototype.listen = function(callback) {
		
		if(isDefined(callback)){
			console.log('Assigning Callback');
			speechCallback = callback;
		}

		if (recognizing) {
			recognition.stop();
			return;
		}
		recognition.start();
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
		return matchedPerson;
	}
	
	return _Receptionist;

})(this);

module.exports = Receptionist;
global.Receptionist = Receptionist;
