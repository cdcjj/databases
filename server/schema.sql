DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--   /* Describe your table here.*/
-- );

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- DROP TABLE IF EXISTS rooms;
    
CREATE TABLE rooms (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  name VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);


-- DROP TABLE IF EXISTS messages;
    
CREATE TABLE messages (
  objectId INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  text VARCHAR(255) NULL DEFAULT NULL,
  createdAt DATETIME NULL DEFAULT NULL,
  updatedAt DATETIME NULL DEFAULT NULL,
  room INTEGER NULL DEFAULT NULL,
  user INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (objectId)
);
-- Table users
-- DROP TABLE IF EXISTS users;
    
CREATE TABLE users (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  username VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);
ALTER TABLE messages ADD FOREIGN KEY (user) REFERENCES users (id);
ALTER TABLE rooms ADD UNIQUE KEY newKey (name);
ALTER TABLE users ADD UNIQUE KEY userKey (username);
