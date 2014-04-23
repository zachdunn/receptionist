var Receptionist = (function(){
		
	var recognition,
		final_transcript = '',
		recognizing = false,
		speechCallback = false,
		listenBtn;

	function _Receptionist(){}

	function getObjects(obj, key, val) {
      var objects = [];
      for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (typeof obj[i] == 'object') {
              objects = objects.concat(getObjects(obj[i], key, val));
          } else if (i == key && typeof(obj[key]) == "string" && obj[key].toLowerCase() == val) {
              //Matches with lowercase version (we're not picky here)
              objects.push(obj);
          } else if (i == key && obj[key] == val) {
              objects.push(obj);
          }
      }
      return objects;
  	}

	_Receptionist.prototype.load = function(){
		
		// Get our DOM lined up
		listenBtn = document.getElementById('listen');
		searchedFor = document.getElementById('searchedFor');
		matchedDisplay = document.getElementById('matched');

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
		  	console.log('Turned it on');
		  }

		  recognition.onresult = function(event) {
		  	var interim_transcript = '';

		    for (var i = event.resultIndex; i < event.results.length; ++i) {
		      if (event.results[i].isFinal) {
		        final_transcript += event.results[i][0].transcript;
		      } else {
		        interim_transcript += event.results[i][0].transcript;
		      }
		    }

		    if (speechCallback && final_transcript != ''){
		    	searchedFor.innerHTML = '<strong>I heard:</strong> \"' + final_transcript + '\"';
		    	speechCallback(final_transcript.toLowerCase());
		    }
		  }

		  recognition.onerror = function(event) {}
		  recognition.onend = function() {
		  	recognizing = false;
		  	listenBtn.textContent = 'Listen';
		  	console.log('Turned it off');
		  }
		}

	}

	_Receptionist.prototype.listen = function(callback) {
		if(typeof callback == "undefined"){
			callback = false;
		}else{
			speechCallback = callback;
		}

		if (recognizing) {
			recognition.stop();
			return
		}
		recognition.start();
	}

	_Receptionist.prototype.showPerson = function(person) {
		if (!person){
			console.log('We need a person to display');
			return;
		}
		var imageBase = 'http://static.onemightyroar.com/site-assets/images/roster/'
		matchedDisplay.innerHTML = '<img width="400px" src="' + imageBase + person.picture + '" alt="' + person.name + '"> <p>' + person.title + '</p>';
	}

	_Receptionist.prototype.upgrade = function() { 
		console.log('Update to a webkit browser for speech');
	}

	_Receptionist.prototype.search = function(term, pool) {
		var matchedPerson = getObjects(pool, 'name', term);
		return matchedPerson;
	}
	
	return _Receptionist;

})(this);

if(typeof exports == 'undefined'){
    var exports = this['mymodule'] = {};
}
exports.RobinReceptionist = Receptionist;

var receptionist = new Receptionist();
