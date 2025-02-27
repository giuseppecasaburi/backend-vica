// IMPORT PER EXPRESS, CORS E DOTENV. EXPRESS PER IL SERVER BACKEND, CORS PER PERMETTERE LE RICHIESTE E DOTENV PER LE VARIABILI D'AMBIENTE
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// CONFIGURAZIONE DELLE VARIABILI D'AMBIENTE
dotenv.config();

// IMPORT DEI VARI ROUTER
import collezioniRouter from './routers/collezioni.js';
import modelliRouter from './routers/modelli.js'

// PORTA DEL SERVER DINAMICA IN BASE A SE è IN A,MBIENTE DI SVILUPPO O PRODUZIONE
const port = process.env.NODE_ENV === "development" ? process.env.PORT : process.env.PORT_PROD;

// APP PER AVVIARE IL SERVER E GESTIRE LE RICHIESTE, PORT PER LA PORTA DEL SERVER
const app = express();

// MIDDLEWARE PER GESTIRE LE RICHIESTE E LE RISPOSTE, CORS PER PERMETTERE LE RICHIESTE DA TUTTI I DOMINI, JSON PER GESTIRE I DATI IN FORMATO JSON
app.use(cors("*"));
app.use(express.json());

// ROTTE PER GESTIRE LE RICHIESTE
app.get("/", (req, res) => {
    console.log("Richiesta ricervuto");
    res.send("Funziona coglionazzo");
});

app.use("/collezioni", collezioniRouter)
app.use("/modelli", modelliRouter)

// AVVIO DEL SERVER SULLA PORTA SPECIFICATA
app.listen(port, () => {
    console.log("Server partito sulla porta: " + port);
});

