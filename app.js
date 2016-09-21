$(document).ready(function(){
   
   
    var signsMaster = [];
    
    var currentCards = [];


    //API Interactions ////////////////////////////////////////

    //Database call function
    function callDatabase(modifier, word, status) {
      $.ajax({
        url: "database.php?query=" + modifier + "&word=" + word + "&status=" + status,
        //data: { dataInfo },
        error: function(jqXHR, errorText, exception) {
          console.log("The attempted database call has had an error.");
          console.log(errorText);
          console.log(exception);
        },
        success: function(returnData) {
          console.log(returnData);
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
      console.log(words);
      return words;
    };

  
  //Puts a random item from current array into the placeholder text
    function switchCard(array) {
        var item = array[Math.floor(Math.random()*array.length)];
        $('#currentItem').text(item);
    };
    
     //next button chooses a random item from chosen array
     $('.next').on('click', function(e) {
         e.preventDefault();
         if(currentCards.length > 0) {
            switchCard(currentCards);
        } else {
            alert('This deck has no cards yet!');
        }
     });
    
    
   ///header button switches which array is being used

   ////All available cards
     $('#all').on('click', function(e){
         e.preventDefault();
         $('#currentItem').text('All Available Cards');
         currentCards = getFromDatabase("getAll");
     });

     ////Cards with "hard" status
     $('#hard').on('click', function(e) {
         e.preventDefault();
         $('#currentItem').text('Cards to Work On');
         currentCards = getFromDatabase("getHard");
     });
     
     ////Cards with "easy" status
     $('#known').on('click', function(e){
         e.preventDefault();
         $('#currentItem').text('Cards You Know');
         currentCards = getFromDatabase("getEasy");
     });
     
    
    //easy pushes to signs known
    
    $('#addKnown').on('click', function(e) {
       e.preventDefault();
       var knownItem = $('#currentItem').text();
       callDatabase("changeStatus", knownItem, "easy");

       //this puts us back on all, I need to know if we're in hard category and reload that
       
       currentCards = getFromDatabase('getAll');
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




    //Alphabetize the set of all default words so they can then be displayed in order on the "Add Words" page.   
    function displayAlpha(arr) {

      var cardsUnsorted = [];

      cardsUnsorted = getFromDatabase("getAll");

      console.log("unsorted: ", cardsUnsorted);

      var simpleArray = ["gasket", "bird", "bear"].sort();

      console.log("simple", simpleArray);

      alphaArray = cardsUnsorted.sort();
      
      console.log("alphabetized ", alphaArray);

      //$('#eachWord').html(wordsHtml.join(""));

    };

    displayAlpha(currentCards);
    
});
