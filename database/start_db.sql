use codegamix;
create table users
(
	id integer NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    level integer NOT NULL,
    exp integer NOT NULL,
    PRIMARY KEY (id)
);
create table admins
(
    id integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES users(id)
);