CREATE TABLE Collezioni (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_collezione VARCHAR(255) NOT NULL,
    descrizione_collezione TEXT,
    slug_collezione VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Modelli (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_modello VARCHAR(255) NOT NULL,
    descrizione_modello TEXT,
    slug_modello VARCHAR(255) NOT NULL UNIQUE,
    id_collezione INT NOT NULL,
    FOREIGN KEY (id_collezione) REFERENCES Collezioni(id)
);

CREATE TABLE tipo_immagine (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_tipo_immagine VARCHAR(255) NOT NULL
);

CREATE TABLE Colori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    colore_hex VARCHAR(255) NOT NULL,
    nome_colore VARCHAR(255) NOT NULL
);

CREATE TABLE colore_modello (
    id_modello INT NOT NULL,
    id_colore INT NOT NULL,
    PRIMARY KEY (id_modello, id_colore),
    FOREIGN KEY (id_modello) REFERENCES Modelli(id) ON DELETE CASCADE,
    FOREIGN KEY (id_colore) REFERENCES Colori(id)
);


CREATE TABLE Immagini (
    id INT PRIMARY KEY AUTO_INCREMENT,
    immagine_url VARCHAR(255) NOT NULL,
    id_modello INT NOT NULL,
    id_tipo INT NOT NULL,
    FOREIGN KEY (id_modello) REFERENCES Modelli(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo) REFERENCES tipo_immagine(id)
);