CREATE DATABASE qtify;
USE qtify;

CREATE TABLE Users(
	id VARCHAR(255),
	PRIMARY KEY(id)
);

CREATE TABLE Groups(
	id VARCHAR(255),
    group_name VARCHAR(255),
    token VARCHAR(1000),
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
	user_id VARCHAR(255),
    group_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (group_id) REFERENCES Groups(id),
    PRIMARY KEY (user_id, group_id)
);

CREATE TABLE Groups_songs(
	group_id VARCHAR(255),
    song_id VARCHAR(255),
    votes INT,
    FOREIGN KEY (group_id) REFERENCES Groups(id),
    FOREIGN KEY (song_id) REFERENCES Songs(id),
    PRIMARY KEY (group_id, song_id)
);

/* SELECT statements for each of the tables in the DB */
SELECT * FROM Users_groups;
SELECT * FROM Users;
SELECT * FROM Groups;
SELECT * FROM Songs;
SELECT * FROM Groups_songs;