CREATE SCHEMA IF NOT EXISTS chat;

CREATE  TABLE chat.user ( 
	user_id              integer  auto_increment  ,
	name                 varchar(100)    ,
	status               varchar(100)    ,
	loggedin             boolean    ,
	CONSTRAINT pk_tbl PRIMARY KEY ( user_id )
 );

CREATE  TABLE chat.friends ( 
	user_id              integer  NOT NULL  ,
	friend_id            integer  NOT NULL  
 );

CREATE  TABLE chat.messages ( 
	tekst                varchar(100)  NOT NULL  ,
	datesent             datetime  NOT NULL  ,
	type               varchar(100)  NOT NULL  ,
	message_id           integer auto_increment  ,
	fk_user              integer    ,
	CONSTRAINT pk_messages PRIMARY KEY ( message_id )
 );

ALTER TABLE chat.friends ADD CONSTRAINT fk_friends_user FOREIGN KEY ( user_id ) REFERENCES chat.user( user_id );

ALTER TABLE chat.messages ADD CONSTRAINT fk_messages_user FOREIGN KEY ( fk_user ) REFERENCES chat.user( user_id );

INSERT INTO chat.user ( name, status, loggedin) VALUES ( 'Elke Steegmans', 'Online' , true   );
INSERT INTO chat.user ( name, status, loggedin) VALUES ( 'Zonny', 'Online' , true   );
INSERT INTO chat.user ( name, status, loggedin) VALUES ( 'Jonas Peeters', 'Online' , true );

INSERT INTO chat.friends (user_id, friend_id) VALUES (3, 2);
INSERT INTO chat.friends(user_id, friend_id) VALUES (3, 1);
INSERT INTO chat.friends (user_id, friend_id) VALUES (2, 3);
INSERT INTO chat.friends (user_id, friend_id) VALUES (1, 2);


INSERT INTO chat.messages (tekst, datesent, type, fk_user) VALUES ('Hoe gaat het?', '2020-03-19', 'Private'    , 2);
INSERT INTO chat.messages (tekst, datesent, type,  fk_user) VALUES ('Goed', '2020-03-19', 'Private'    , 1);
INSERT INTO chat.messages (tekst, datesent, type,  fk_user) VALUES ('Ik heb een nieuwe pc', '2020-03-23', 'Private'    , 3);
