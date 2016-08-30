$(document).ready(function(){
   
   
    //var signsMaster = [];
    
    var currentCards = [];

    //API Interactions ////////////////////////////////////////

    //Database call function
    function callDatabase(modifier, dataInfo) {
      $.ajax({
        url: "database.php?query=" + modifier,
        data: { dataInfo },
        error: function(jqXHR, errorText, exception) {
          console.log("The attempted database call has had an error.");
          console.log(errorText);
          console.log(exception);
        },
        success: function(data) {
          console.log(data);
        },
        type: 'POST'
      });
    }

    //get json with jquery getJSON function
    function getFromDatabase(modifier) {
      var useURL = "database.php?query=" + modifier;
      var words = [];
      $.getJSON(useURL, function(data){
        
        $.each(data, function(key, val){
          words.push(val.word);
        });
      });
      return words;
    };

    //This function is returning something strange.  It is an array that is functional for some of the functions below, but not others.  The functions that switch what group of words 
    //are being displayed work, as well as the randomizers function for any current array.  

    //However, 

    ///////////////////////////////////////////////////////////////////

    //Initiate deck with all cards 
    var initialWords = getFromDatabase("getAll");

    var signsMaster = $.map(initialWords, function(value, index) {
      return [value];
    });

    console.log(signsMaster[0]); //This logs 'undefined'


  
  //Puts a random item from current array into the placeholder text
    function switchCard(array) {
        var item = array[Math.floor(Math.random()*array.length)];
        $('#currentItem').text(item);
    };
    
     //next button chooses a new random item from chosen array
     $('.next').on('click', function(e) {
         e.preventDefault();
         if(currentCards.length > 0) {
            switchCard(currentCards);
        } else {
            alert('This deck has no cards yet!');
        }
     });
    
    
   ///header buttons switches which array being used
     $('#all').on('click', function(e){
         e.preventDefault();
         $('#currentItem').text('All Available Cards');
         currentCards = signsMaster;
     });
     
     $('#hard').on('click', function(e) {
         e.preventDefault();
         $('#currentItem').text('Cards to Work On');
         currentCards = getFromDatabase("getHard");
     });
     
     $('#known').on('click', function(e){
         e.preventDefault();
         $('#currentItem').text('Cards You Know');
         currentCards = getFromDatabase("getEasy");
     });
     
    
    //easy pushes to signs known
    
    $('#addKnown').on('click', function(e) {
       e.preventDefault();
       var knownItem = $('#currentItem').text();
       signsKnown.push(knownItem);
       
       //remove from hard deck if moving to easy, advances master deck
       if(currentCards === signsNeedWork) {
           var i = signsNeedWork.indexOf(knownItem);
           signsNeedWork.splice(i, 1);
       } else if(currentCards === signsMaster) {
           switchCard(currentCards);
       }
    });
    
    // need work pushes to signs not known
    
    $('#addRepeat').on('click', function(e) {
        e.preventDefault();
        var hardItem = $('#currentItem').text();
        signsNeedWork.push(hardItem);
        
        //remove from easy deck if moving to hard, advances master desk
        if(currentCards === signsKnown) {
            var i = signsKnown.indexOf(hardItem);
            signsKnown.splice(i, 1);
        } else if(currentCards === signsMaster) {
           switchCard(currentCards);
       }
    });

    /*$('#addWord').on('click', function(e) {
       e.preventDefault();
       var newWord = $('#enterWord').text();
       var 
       callDatabase("addWord", );*/



    //This function is intended to alphabetize the set of all default words so they can then be displayed in order on the "Add Words" page.    
    //However, there is a problem with the data coming from $getJSON such that the primary array is not being processed
    function displayAlpha(arr) {

      var alphaArray = $.map(arr, function(value, index){
        return [value];
      })
      var wordsHtml = [];

      console.log(alphaArray);

      for(var i = 0; i < alphaArray.length; i++) {
        wordsHtml.push(alphaArray[i]);
      }

      console.log(alphaArray);

      //$('#eachWord').html(wordsHtml.join(""));

    };

    displayAlpha(signsMaster);
    
});
