var people,
  peopleLoaded,
  searchResults,
  matchedPerson;

//Load the receptionist
options = {
  rosterURL: 'people.json'
}

var receptionist = new Receptionist(options);

receptionist.load().then(function(){

  // Watch for audio events
  $('#listen').on('click', function(e){
    e.preventDefault();
    receptionist.listen();
  });

  $('body').on('keyup', function(e){

    var code = e.keyCode || e.which;
    if(code == 32) { //Spacebar
      e.preventDefault();
      receptionist.listen();
    }
  });

  receptionist.on('callout', function(rawSpeech){
    console.log('How can I help?');
    $('.loading-overlay').fadeIn(300);
  });

  receptionist.on('speech', function(data){
    console.log(data.command);
    $('.loading-overlay').fadeOut(300);
    var words = data.command.split(' ');
    switch (words[0]) {
      case 'notify' :
        var to = words[1],
        message = words.splice(2).join(' ');
        console.log(to + ':', message)
        break;
      case 'book' :
        var target = words.splice(1).join(' ');
        console.log('Booking:', target);
        break;
      case 'go' :
        var target = words.splice(1).join(' ');
        if (target == "off the record"){
          console.log('Notes disabled');
          receptionist.stopListening();
        }else if (target == "on the record"){
          console.log('Taking notes');
        }
        break;
      case 'share' :
        var target = words.splice(1).join(' ');
        console.log('Sharing:', target);
      case 'find':
        var target = words.splice(1).join(' ');
        searchResults = receptionist.search(target);
        if (searchResults.length > 0) {
          receptionist.showPerson(searchResults[0]);
        }else{
          $('#matched').html('<p>Sorry, I could\'t find anyone by that name.</p>');
        }
        break;
    }
  });

});
