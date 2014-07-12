var _ = require('underscore');

var Receptionist = (function(){
		
	var recognition,
		final_transcript = '',
		recognizing = false,
		speechCallback = false,
		options = {},
		people,
		listenBtn;

	var defaults = {
		name: 'Robin'
	};

	function _Receptionist(config){
		this.options = _.extend(defaults, config);
		this.setName(this.options.name);
		console.log('Receptionist started as \"' + this.getName() + '\"');
	}

	_Receptionist.prototype.load = function(userOptions, success){
		
		// Get our DOM lined up
		listenBtn = document.getElementById('listen');
		searchedFor = document.getElementById('searchedFor');
		matchedDisplay = document.getElementById('matched');

		defaultOptions = {
			name: 'Robin',
			rosterURL: 'people.json',
			imageBase: 'http://static.onemightyroar.com/site-assets/images/roster/',
			voiceEnabled: true
		}

		if (isDefined(userOptions)){
			extend(defaultOptions, userOptions);
		}

		options = defaultOptions
		console.log(options);
		
		if(options.voiceEnabled){
			this.loadSpeech()
		}

		loadJSON(options.rosterURL, function(rosterData){
			people = rosterData;
			console.log(people);
			if(success)
				success();
		}, function(xhr){
			// Something went wrong
			if(error)
				error(xhr);
		});
	}

	_Receptionist.prototype.loadSpeech = function() {
		if (!('webkitSpeechRecognition' in window)) {
	  		upgrade();
		} else {
			recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = false;

			recognition.onstart = function() {
				recognizing = true;
				final_transcript = '';
				searchedFor.innerHTML = '';
				listenBtn.textContent = 'Listening';
				console.log('Turned voice on');
			}

			recognition.onresult = function(event) {
				console.log('Result in');
				var interim_transcript = '';

				for (var i = event.resultIndex; i < event.results.length; ++i) {
				  if (event.results[i].isFinal) {
				    final_transcript += event.results[i][0].transcript;
				  } else {
				    interim_transcript += event.results[i][0].transcript;
				  }
				}

				if (final_transcript != ''){
					searchedFor.innerHTML = '<strong>I heard:</strong> \"' + final_transcript + '\"';
					if (isDefined(speechCallback)){
						speechCallback(final_transcript.toLowerCase());
					}
				}
			}

			recognition.onerror = function(event) {}
			recognition.onend = function() {
				recognizing = false;
				listenBtn.textContent = 'Listen';
				console.log('Turned voice off');
			}
		}
	}

	_Receptionist.prototype.listen = function(callback) {
		
		if(isDefined(callback)){
			console.log('Assigning Callback');
			speechCallback = callback;
		}

		if (recognizing) {
			recognition.stop();
			return
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
		matchedDisplay.innerHTML = '<img width="400px" src="' + defaultOptions.imageBase + person.picture + '" alt="' + person.name + '"> <p>' + person.title + '</p>';
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
