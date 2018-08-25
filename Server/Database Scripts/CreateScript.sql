CREATE DATABASE qtify;
USE qtify;

CREATE TABLE Users(
	email VARCHAR(255),
	PRIMARY KEY(email)
);

CREATE TABLE Groups(
	id INT AUTO_INCREMENT,
    group_name VARCHAR(255),
    token VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE Songs(
	id VARCHAR(255),
    song_name VARCHAR(255),
    artist VARCHAR(255),
    image_url VARCHAR(1000),
    PRIMARY KEY (id)
);

CREATE TABLE Users_groups(
	user_email VARCHAR(255),
    group_id INT,
    FOREIGN KEY (user_email) REFERENCES Users(email),
    FOREIGN KEY (group_id) REFERENCES Groups(id),
    PRIMARY KEY (user_email, group_id)
);

CREATE TABLE Groups_songs(
	group_id INT,
    song_id VARCHAR(255),
    votes INT,
    FOREIGN KEY (group_id) REFERENCES Groups(id),
    FOREIGN KEY (song_id) REFERENCES Songs(id),
    PRIMARY KEY (group_id, song_id)
);