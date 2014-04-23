var people,
    peopleLoaded,
    matchedPerson = false;

//Load the receptionist
options = {
    rosterURL: 'people.json'
}

receptionist.load(options, function(){
    console.log("Ready to go");
    // Watch for audio events
    $('#listen').on('click', function(e){
        e.preventDefault();
        matchedPerson = false;
        
        receptionist.listen(function(transcript){
            
            matchedPerson = receptionist.search(transcript);
            
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
});
