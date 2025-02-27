import db from "../data/db.js";

const index = (req, res) => {
    // QUERY PER PRELEVARE TUTTI I MODELLI
    const sqlModelli = `
    SELECT 
        modelli.id AS modello_id,
        nome_modello,
        descrizione_modello,
        slug_modello,
        id_collezione,
    COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'img_id', immagini.id,
                'immagine_url', immagini.immagine_url,
                'id_tipo', immagini.id_tipo
            )
        ), 
        JSON_ARRAY()
    ) AS immagini
    FROM modelli
    LEFT JOIN immagini ON modelli.id = immagini.id_modello
    GROUP BY modelli.id;`

    db.query(sqlModelli, (err, modelli) => {
        if (err) {
            return res.status(500).json({
                status: "Error",
                message: "Errore: " + err
            });
        };

        if (modelli.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "Nessun modello trovato"
            });
        };

        return res.status(200).json({
            status: "Success",
            data: modelli
        })
    })

}

const show = (req, res) => {
    const slug = req.params.slug
    const sqlModelloSingolo = `
    SELECT 
        modelli.id AS modello_id,
        nome_modello,
        descrizione_modello,
        slug_modello,
        id_collezione,
        COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'img_id', immagini.id,
                    'immagine_url', immagini.immagine_url,
                    'id_tipo', immagini.id_tipo
                )
            ), 
            JSON_ARRAY()
        ) AS immagini
    FROM modelli
    LEFT JOIN immagini ON modelli.id = immagini.id_modello
    WHERE modelli.slug_modello = ?
    GROUP BY modelli.id
    `

    db.query(sqlModelloSingolo, [slug], (err, modelloSingolo) => {
        if (err) {
            return res.status(500).json({
                status: "Error",
                message: "Errore:" + err
            })
        }

        if (modelloSingolo.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "Modello non trovato"
            })
        }

        return res.status(200).json({
            status: "Success",
            data: modelloSingolo
        })
    })
}

export default {
    index,
    show
}