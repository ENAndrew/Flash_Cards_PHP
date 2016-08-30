//database name is asl_flash_cards

CREATE TABLE vocab_words {
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	word VARCHAR (70) NOT NULL, 
	status ENUM ('easy', 'hard', 'default') DEFAULT 'default'
};