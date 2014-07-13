var people,
  peopleLoaded,
  searchResults,
  matchedPerson;

//Load the receptionist
options = {
  rosterURL: 'people.json'
}

var receptionist = new Receptionist();

receptionist.load(options, function(){
  console.log("Ready to go");
  // Watch for audio events
  $('#listen').on('click', function(e){
    e.preventDefault();
    searchResults = false;
    
    receptionist.listen(function(transcript){     
      /*searchResults = receptionist.search(transcript);
     
      console.log(transcript);
      console.log(searchResults);

      if (searchResults.length > 0){
        receptionist.showPerson(searchResults[0]); // Send first result by default
      }else{
        console.log('No results found');
        $('#matched').html('<p>Sorry, I could\'t find anyone by that name.</p>');
      }*/
    });
  });
});
