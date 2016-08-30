<?php 

$host = "localhost";
$user = "root";
$password = NULL;
$name = "asl_flash_cards";

try {
	$db_connect = new PDO("mysql:host={$host};dbname={$name}", $user, $password);
	$db_connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
	echo "A connection error has ocurred: ", print_r($exception->getMessage());
}


//Add new word to list
	function addWord($db_connect, $newWord) {
		try {
			$sqlstmt = $db_connect->prepare("INSERT INTO vocab_words(word) VALUES(:newWord)");
			$sqlstmt->execute(array("newWord" => $newWord));
			return true;
		} catch(PDOException $exception) {
			echo "There was an error adding this word: ", print_r($exception->getMessage());
			return false;
		}
	}

	//get all words
	function allWords($db_connect){
		try{
			$sqlstmt = $db_connect->prepare("SELECT word fROM vocab_words");
			$sqlstmt->execute();
			$allWords = $sqlstmt->fetchAll(PDO::FETCH_ASSOC);
			return json_encode($allWords);
		} catch(PDOException $exception) {
			echo "Could not get the vocab words: ", print_r($exception->getMessage());
		}
	}

	//Get word set by status
	function getWords($db_connect, $status) {
		try{
			$sqlstmt = $db_connect->prepare("SELECT word FROM vocab_words WHERE status=:status");
			$sqlstmt->execute(array("status" => $status));
			$wordSet = $sqlstmt->fetchAll(PDO::FETCH_ASSOC);
			return json_encode($wordSet);
		} catch(PDOException $exception) {
			echo "Could not get this word set: ", print_r($exception->getMessage());
			return false;
		}
	}

	//Handle requests by type/nature
	function requestHandler($db_connect){

		if(isset($_REQUEST['query'])) {

			//This is functional on the surface, however, there is a problem with the data being returned or the parsing on the client side

			$action = $_REQUEST['query'];

			switch($action) {
				case "getAll":
					echo allWords($db_connect);
					break;
				case "getHard": 
					echo getWords($db_connect, 'hard');
					break;
				case "getEasy":
					echo getWords($db_connect, 'easy');
					break;
			}
			
		} elseif(isset($_REQUEST['addForm'])) {

			//This is functional

			//I'd rather this be an actual API call or includes some sort of response so I can change the html text to advise that a new word has been submitted. 

			$word = $_REQUEST['addForm'];

			if(addWord($db_connect, $word)) {
				header("Location: add_words.html"); //Should reload page with updated word list

			}
			
		}


	}

	requesthandler($db_connect);

?>