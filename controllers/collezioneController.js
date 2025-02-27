import db from '../data/db.js';

const index = (req, res) => {

    // QUERY PER OTTENIMENTO COLLEZIONI
    const sqlCollezioni = 
    `SELECT 
        collezioni.id,
        collezioni.nome_collezione,
        collezioni.descrizione_collezione,
        collezioni.slug_collezione
    FROM collezioni`;

    db.query(sqlCollezioni, (err, collezioni) => {
        if (err) {
            return res.status(500).json({
                status: "Error",
                message: "Errore:" + err
            })
        }

        if (collezioni.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "Nessuna collezione trovata"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: collezioni
        })
    })
    

};

const showNavigate = (req, res) => {
    // PRIMA query, OTTENIMENTO DELLE COLLEZIONI
    const sqlCollezioni = 
    `SELECT 
        collezioni.id,
        collezioni.nome_collezione,
        collezioni.descrizione_collezione,
        collezioni.slug_collezione
    FROM collezioni`
    
    db.query(sqlCollezioni, (err, collezioni) => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "Errore:" + err
                });
            }

            if (collezioni.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Nessuna collezione trovata"
                });
            }

            // QUERY OTTENIMENTO MODELLI ASSOCIATI
            const sqlModelli = `SELECT
                        id as modello_id,
                        nome_modello,
                        slug_modello
                    FROM modelli
                    WHERE id_collezione = ?`

            // PER OGNI COLLEZIONE OTTIENI I MODELLI ASSOCIATI
            let completed = 0;

            collezioni.forEach((collezione, index) => {
                db.query(sqlModelli, [collezione.id], (err, modelli) => {
                        if (err) {
                            return res.status(500).json({
                                status: "Error",
                                message: "Errore:" + err.message
                            });
                        }

                        // if (modelli.length === 0) {
                        //     return res.status(404).json({
                        //         status: "Error",
                        //         message: "Nessun modello trovato per la collezione " + collezione.nome_collezione
                        //     });
                        // }

                        collezioni[index].modelli = modelli;

                        completed++;

                        // Quando tutte le query sui modelli sono complete, inviamo la risposta
                        if (completed === collezioni.length) {
                            return res.status(200).json({
                                status: "success",
                                data: collezioni
                            });
                        }
                    }
                );
            });
        }
    );
};


export default {
    index,
    showNavigate,
};
