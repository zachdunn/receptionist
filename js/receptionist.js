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

	/*
	 * Utils and helpers (Mainly from Angular)
	 **/
	function isDefined(obj){
		if (typeof obj == "undefined" || obj == ""){
			return false;
		}else{
			return true;
		}
	}

	function isFunction(value){return typeof value === 'function';}
	function isString(value){return typeof value === 'string';}
	function isObject(value){return value != null && typeof value === 'object';}
	function isNumber(value){return typeof value === 'number';}
	function isArray(value) {
	  return toString.call(value) === '[object Array]';
	}

	function isWindow(obj) {
	  return obj && obj.document && obj.location && obj.alert && obj.setInterval;
	}

	function isArrayLike(obj) {
  		if (obj == null || isWindow(obj)) {
    		return false;
  		}

  		var length = obj.length;

  		if (obj.nodeType === 1 && length) {
    		return true;
  		}

  		return isString(obj) || isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
	}

	function forEach(obj, iterator, context) {
	  var key;
	  if (obj) {
	    if (typeof(obj) == "function"){
	      for (key in obj) {
	        // Need to check if hasOwnProperty exists,
	        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
	        if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
	          iterator.call(context, obj[key], key);
	        }
	      }
	    } else if (obj.forEach && obj.forEach !== forEach) {
	      obj.forEach(iterator, context);
	    } else if (isArrayLike(obj)) {
	      for (key = 0; key < obj.length; key++)
	        iterator.call(context, obj[key], key);
	    } else {
	      for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          iterator.call(context, obj[key], key);
	        }
	      }
	    }
	  }
	  return obj;
	}

	function extend(dst) {
	  forEach(arguments, function(obj){
	    if (obj !== dst) {
	      forEach(obj, function(value, key){
	        dst[key] = value;
	      });
	    }
	  });
	  return dst;
	}

	function getObjects(obj, key, val) {
      var objects = [];
      for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (typeof obj[i] == 'object') {
              objects = objects.concat(getObjects(obj[i], key, val));
          } else if (i == key && isString(obj[key]) && obj[key].toLowerCase() == val) {
              //Matches with lowercase version (we're not picky here)
              objects.push(obj);
          } else if (i == key && obj[key] == val) {
              objects.push(obj);
          }
      }
      return objects;
  	}

  	function loadJSON(path, success, error)
	{
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function()
	    {
	        if (xhr.readyState === 4) {
	            if (xhr.status === 200) {
	                if (success)
	                    success(JSON.parse(xhr.responseText));
	            } else {
	                if (error)
	                    error(xhr);
	            }
	        }
	    };
	    xhr.open("GET", path, true);
	    xhr.send();
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
