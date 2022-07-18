

DROP TABLE IF EXISTS residential CASCADE;
CREATE TABLE residential(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	nit VARCHAR(255) NOT NULL UNIQUE, 
	address VARCHAR(255) NOT NULL NULL,
    lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) not null,
    lastname VARCHAR(255) not null,
    phone VARCHAR(80) not  null,
    email VARCHAR(255) not null,
    image VARCHAR(255) null,
    dni VARCHAR(80) UNIQUE,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS residential_has_user CASCADE;
CREATE TABLE residential_has_user(
	idResidential BIGSERIAL NOT NULL,
    idUser BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(idResidential) REFERENCES residential(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(idUser) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
); 

DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	idRoles BIGSERIAL NOT NULL,
    idUser BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(idRoles) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(idUser) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
); 

DROP TABLE IF EXISTS sets CASCADE;
CREATE TABLE sets(
	id BIGSERIAL PRIMARY KEY,
    tower VARCHAR(80) NOT NULL UNIQUE,
    apartament VARCHAR(80) NOT NULL UNIQUE,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
	id BIGSERIAL PRIMARY KEY,
    idSets BIGSERIAL NOT NULL,
    idUser BIGSERIAL NOT NULL,
    image1 VARCHAR(255) NOT NULL,
    image2 VARCHAR(255) NULL,
    image3 VARCHAR(255) NULL,
    descriptions VARCHAR(255) NULL,
    statuss VARCHAR(80) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(idSets) REFERENCES sets(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(idUser) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_has_sets CASCADE;
CREATE TABLE user_has_sets(
	idUser BIGSERIAL NOT NULL,
    idSets BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(idUser) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(idSets) REFERENCES sets(id) ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO residential  VALUES (1,'Porvenir 3','123.321.222','Cll 54 Csur No 97 - 20','0','0','2022-06-01','2022-06-01');
INSERT INTO residential  VALUES (2,'Porvenir 1','123.321.422','Cll 54 Csur No 97 - 22','0','0','2022-06-01','2022-06-01');

INSERT INTO users VALUES (1, 'Carlos', 'Medina', '325414587','carlos@gmail.com','null','258741478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (2, 'Paula', 'Gomez', '885414587','paula@gmail.com','null','888741478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (3, 'Luis', 'Sanchez', '995414587','luis@gmail.com','null','9941478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (4, 'Maria', 'Ramirez', '10105414587','maria@gmail.com','null','109941478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (5, 'Pedro', 'Perez', '125414587','pedro@gmail.com','null','129941478','2022-06-01','2022-06-01');

INSERT INTO users VALUES (6, 'Jhonny', 'Poloche', '145414587','jhonny@gmail.com','null','119941478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (7, 'Julian', 'Arciniegas', '225414587','julian@gmail.com','null','229941478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (8, 'Dorian', 'Roca', '325414587','dorian@gmail.com','null','339941478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (9, 'Jeimy', 'Medina', '355414587','jeimy@gmail.com','null','329941478','2022-06-01','2022-06-01');
INSERT INTO users VALUES (10, 'Jhon', 'Martinez', '405414587','jhon@gmail.com','null','449941478','2022-06-01','2022-06-01');

INSERT INTO residential_has_user VALUES (1,1,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (2,2,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (1,3,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (1,4,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (1,5,'2022-06-01','2022-06-01');

INSERT INTO residential_has_user VALUES (2,6,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (2,7,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (2,8,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (2,9,'2022-06-01','2022-06-01');
INSERT INTO residential_has_user VALUES (2,10,'2022-06-01','2022-06-01');

INSERT INTO roles VALUES (1, 'VIGILANTE','null','2022-06-01','2022-06-01');
INSERT INTO roles VALUES (2, 'RESIDENTE','null','2022-06-01','2022-06-01');

INSERT INTO user_has_roles VALUES (1,1,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (1,2,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (2,3,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (2,4,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (2,5,'2022-06-01','2022-06-01');

INSERT INTO user_has_roles VALUES (1,6,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (1,7,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (2,8,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (2,9,'2022-06-01','2022-06-01');
INSERT INTO user_has_roles VALUES (2,10,'2022-06-01','2022-06-01');

INSERT INTO sets VALUES (1, '1','101','2022-06-01','2022-06-01');
INSERT INTO sets VALUES (2, '2','102','2022-06-01','2022-06-01');
INSERT INTO sets VALUES (3, '3','103','2022-06-01','2022-06-01');
INSERT INTO sets VALUES (4, '4','104','2022-06-01','2022-06-01');
INSERT INTO sets VALUES (5, '5','105','2022-06-01','2022-06-01');
INSERT INTO sets VALUES (6, '6','106','2022-06-01','2022-06-01');



INSERT INTO orders VALUES (1, 1, 3, 'null', 'null', 'null', 'Paquete servientrega', 'RECIBIDO','2022-06-01','2022-06-01');
INSERT INTO orders VALUES (2, 2, 4, 'null', 'null', 'null', 'Paquete coordinadora', 'ENTREGADO','2022-06-01','2022-06-01');
INSERT INTO orders VALUES (3, 3, 5, 'null', 'null', 'null', 'Paquete aliexpress', 'RECIBIDO','2022-06-01','2022-06-01');
INSERT INTO orders VALUES (4, 4, 8, 'null', 'null', 'null', 'Paquete mercadolibre', 'ENTREGADO','2022-06-01','2022-06-01');
INSERT INTO orders VALUES (5, 5, 9, 'null', 'null', 'null', 'Paquete amazon', 'ENTREGADO','2022-06-01','2022-06-01');
INSERT INTO orders VALUES (6, 6, 10, 'null', 'null', 'null', 'Paquete rapidisimo', 'RECIBIDO','2022-06-01','2022-06-01');

INSERT INTO user_has_sets VALUES (3,1,'2022-06-01','2022-06-01');
INSERT INTO user_has_sets VALUES (4,2,'2022-06-01','2022-06-01');
INSERT INTO user_has_sets VALUES (5,3,'2022-06-01','2022-06-01');
INSERT INTO user_has_sets VALUES (8,4,'2022-06-01','2022-06-01');
INSERT INTO user_has_sets VALUES (9,5,'2022-06-01','2022-06-01');
INSERT INTO user_has_sets VALUES (10,6,'2022-06-01','2022-06-01');