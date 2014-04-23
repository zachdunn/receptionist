var people,
    peopleLoaded,
    matchedPerson = false;

//Load the receptionist
receptionist.load();

// Get the company roster
$.getJSON('people.json', function(data){
    people = data;
    console.log(data);
    if (people){
        peopleLoaded = true
    }
});

// Watch for audio events
$('#listen').on('click', function(e){
    e.preventDefault();
    matchedPerson = false;
    
    receptionist.listen(function(transcript){

        // Don't proceed unless the roster is loaded.
        if (!peopleLoaded){
            console.log('The people roster hasn\'t been loaded yet');
            return;
        }
        
        matchedPerson = receptionist.search(transcript, people);
        
        console.log(transcript);
        console.log(matchedPerson);

        if (matchedPerson.length > 0){
            receptionist.showPerson(matchedPerson[0]); // Send first result by default
        }else{
            console.log('No results found');
            $('#matched').html('<p>Sorry, I could\'t find anyone by that name.</p>')
        }
    });
});