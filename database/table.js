import {dbPromise} from "./db.js";

async function createTables() {
    const db = await dbPromise;

    await db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        tipo TEXT CHECK(tipo IN ('administrador', 'cliente')) NOT NULL
    );`
    );

    await db.run(`CREATE TABLE IF NOT EXISTS planos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL NOT NULL
    );`
    );

    await db.run(`CREATE TABLE IF NOT EXISTS contratos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INT,
        plano_id INT,
        status TEXT CHECK(status IN ('ativo', 'inativo', 'cancelado')) NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (plano_id) REFERENCES planos(id)
    );`
    );

}

createTables();